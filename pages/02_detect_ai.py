# pages/02_detect_ai.py
import os
import time
import io
import numpy as np
import streamlit as st
from utils import ensure_state, hide_sidebar_nav, score_ojas

# --- Google Cloud clients
from google.cloud import speech_v2
from google.cloud import language_v2
from google.cloud import vision

import vertexai
from vertexai.generative_models import GenerativeModel, Part

st.set_page_config(page_title="Detect Ojas (AI-assisted)", page_icon="🧪", layout="wide")
hide_sidebar_nav()
ensure_state()

PROJECT_ID = os.getenv("GCP_PROJECT_ID")
LOCATION   = os.getenv("GCP_LOCATION", "asia-south1")

# init Vertex AI once
if PROJECT_ID:
    vertexai.init(project=PROJECT_ID, location=LOCATION)

st.title("AI-Assisted Ojas Check")
st.write("This guided check blends a short mood questionnaire, a brief breathing exercise, and an optional voice reflection. "
         "It’s **not medical advice**—just a gentle wellness snapshot.")

st.divider()
st.subheader("① Quick Mood Questionnaire (WHO-5 style)")

with st.form("who5_form"):
    st.caption("In the **last 2 weeks**, how often did you feel the following? (0=At no time … 5=All of the time)")
    q1 = st.slider("I felt cheerful and in good spirits", 0, 5, 3)
    q2 = st.slider("I felt calm and relaxed", 0, 5, 3)
    q3 = st.slider("I felt active and vigorous", 0, 5, 3)
    q4 = st.slider("I woke up feeling fresh and rested", 0, 5, 3)
    q5 = st.slider("My daily life has been filled with things that interest me", 0, 5, 3)
    submit_who5 = st.form_submit_button("Save Questionnaire")
    if submit_who5:
        st.session_state["who5"] = (q1+q2+q3+q4+q5)  # raw 0..25
        st.success(f"Saved (score {st.session_state['who5']}/25)")

st.divider()
st.subheader("② Breathing Pace (≈30 seconds)")

st.write("Click **Start**, breathe naturally for ~30s with your **mic nearby**. We estimate breaths-per-minute from amplitude peaks. "
         "You can skip if you prefer.")

audio_bytes = st.audio_input("Record breath (~30s)")
if audio_bytes is not None:
    st.info("Processing audio to estimate breath pace…")
    from pydub import AudioSegment
    seg = AudioSegment.from_file(io.BytesIO(audio_bytes.getvalue()))
    # Convert to mono, 16kHz
    seg = seg.set_channels(1).set_frame_rate(16000)
    samples = np.array(seg.get_array_of_samples()).astype(np.float32)
    samples = samples / (np.max(np.abs(samples)) + 1e-6)

    # Simple peak-count approach: moving RMS + threshold crossing
    win = 2048
    rms = np.sqrt(np.convolve(samples**2, np.ones(win)/win, mode='valid'))
    thr = max(0.1, float(np.percentile(rms, 75))*0.6)
    peaks = (rms[1:-1] > thr) & (rms[1:-1] > rms[:-2]) & (rms[1:-1] > rms[2:])
    peak_count = int(peaks.sum())

    duration_sec = len(seg) / 1000.0
    # breaths ~= peaks/2 (inhale+exhale pair) — heuristic
    breaths = max(1, peak_count // 2)
    bpm = int(60.0 * breaths / max(1.0, duration_sec))
    st.session_state["bpm"] = bpm
    st.success(f"Estimated breathing pace ≈ **{bpm} breaths/min**")

st.caption("Tip: If this is noisy, you can skip. Later you could upgrade to webcam chest-motion via MediaPipe.")

st.divider()
st.subheader("③ Voice Reflection (60–90s, optional)")

st.write("Share how you feel today. We’ll transcribe with **Cloud Speech-to-Text**, summarize with **Gemini**, "
         "and compute a neutral sentiment snapshot (Language API).")

voice_bytes = st.audio_input("Record reflection (60–90s)")
if voice_bytes and PROJECT_ID:
    st.info("Transcribing with Google Cloud Speech-to-Text…")
    client = speech_v2.SpeechClient()
    cfg = speech_v2.RecognitionConfig(
        explicit_decoding_config=speech_v2.ExplicitDecodingConfig(
            encoding=speech_v2.ExplicitDecodingConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            audio_channels=1,
        ),
        language_codes=["en-US"],  # or "en-IN" if preferred
        model="latest_short",
        features=speech_v2.RecognitionFeatures(
            enable_automatic_punctuation=True
        ),
    )
    req = speech_v2.RecognizeRequest(
        recognizer=f"projects/{PROJECT_ID}/locations/{LOCATION}/recognizers/_",
        config=cfg,
        content=voice_bytes.getvalue()
    )
    resp = client.recognize(request=req)
    transcript = " ".join([alt.transcript for r in resp.results for alt in r.alternatives])
    if transcript.strip():
        st.write("**Transcript:**")
        st.write(transcript)

        # Sentiment
        nlc = language_v2.LanguageServiceClient()
        doc = {"content": transcript, "type_": language_v2.Document.Type.PLAIN_TEXT}
        sresp = nlc.analyze_sentiment(request={"document": doc, "encoding_type": language_v2.EncodingType.UTF8})
        sent_score = sresp.document_sentiment.score  # -1..1
        sent_mag   = sresp.document_sentiment.magnitude
        st.info(f"Sentiment snapshot → score: {sent_score:.2f} (−1..+1), magnitude: {sent_mag:.2f}")

        # Gemini summary (Vertex AI)
        try:
            model = GenerativeModel("gemini-1.5-flash")
            prompt = (
                "Summarize the speaker's emotional tone in one short, gentle paragraph. "
                "Avoid advice. No medical claims. End with 1 encouraging sentence."
            )
            gen = model.generate_content([prompt, Part.from_text(transcript)])
            st.success("Gemini summary:")
            st.write(gen.text)
            st.session_state["voice_summary"] = gen.text
        except Exception as e:
            st.warning(f"Gemini summary skipped: {e}")
    else:
        st.warning("Could not transcribe anything meaningful.")

st.divider()
st.subheader("④ (Optional) Face Affect Snapshot")

st.write("If you upload a **selfie** now, Vision API will return general affect likelihoods (joy/sorrow/anger/surprise). "
         "No identity recognition. You can skip this.")
img_file = st.file_uploader("Upload a selfie (PNG/JPG)", type=["png", "jpg", "jpeg"])
affect = {}
if img_file and PROJECT_ID:
    st.info("Analyzing affect likelihoods (Vision API)…")
    vclient = vision.ImageAnnotatorClient()
    content = img_file.read()
    image = vision.Image(content=content)
    vresp = vclient.face_detection(image=image)
    faces = vresp.face_annotations
    if faces:
        f = faces[0]
        # Map likelihood enum to 0..1
        lk = vision.Likelihood
        def L(x): return [lk.UNKNOWN, lk.VERY_UNLIKELY, lk.UNLIKELY, lk.POSSIBLE, lk.LIKELY, lk.VERY_LIKELY].index(x)/5.0
        affect = {
            "joy": L(f.joy_likelihood),
            "sorrow": L(f.sorrow_likelihood),
            "anger": L(f.anger_likelihood),
            "surprise": L(f.surprise_likelihood),
        }
        st.write(f"**Affect likelihoods:** { {k: round(v,2) for k,v in affect.items()} }")
    else:
        st.info("No face detected.")

st.divider()
st.subheader("⑤ Fuse into Ojas (0–100)")

# --- Fusion weights (tweakable)
who5_raw   = st.session_state.get("who5")   # 0..25
bpm        = st.session_state.get("bpm")    # breaths/min
voice_sent = None
if "voice_summary" in st.session_state:
    # we also captured sentiment earlier if available
    pass

# For sentiment, retrieve from a stored variable if you want (quick hack: recompute when transcript exists)
# We'll keep a local cached number if available:
voice_sent = locals().get("sent_score", None)

manual = st.session_state.get("ojas_level")  # from quick page, optional

def normalize_who5(x):   # 0..25 -> 0..1
    if x is None: return None
    return max(0.0, min(1.0, x/25.0))

def normalize_bpm(x):    # map calm 5–9 -> high score; stressed 18+ -> low score
    if x is None: return None
    if x <= 4:  return 0.7  # suspiciously low (mic issue), partial credit
    if x <= 9:  return 1.0  # calm
    if x <= 14: return 0.8
    if x <= 18: return 0.6
    if x <= 24: return 0.4
    return 0.25

def normalize_sentiment(s):  # -1..1 -> 0..1
    if s is None: return None
    return (s + 1.0)/2.0

def normalize_affect(a):     # use joy vs sorrow/anger
    if not a: return None
    joy = a.get("joy",0.0)
    neg = max(a.get("sorrow",0.0), a.get("anger",0.0))
    base = 0.5 + (joy - neg)*0.4
    return max(0.0, min(1.0, base))

parts = []
vals = []

w_who5, w_bpm, w_sent, w_aff, w_manual = 0.30, 0.25, 0.20, 0.10, 0.15

nw = normalize_who5(who5_raw);       parts.append(("Questionnaire", nw, w_who5))
nb = normalize_bpm(bpm);             parts.append(("Breathing pace", nb, w_bpm))
ns = normalize_sentiment(voice_sent);parts.append(("Voice sentiment", ns, w_sent))
na = normalize_affect(affect);       parts.append(("Affect snapshot", na, w_aff))
if manual is not None:
    parts.append(("Manual quick check", manual/100.0, w_manual))

# compute
total_w = sum(w for _,v,w in parts if v is not None)
if total_w == 0:
    st.warning("Provide at least one signal above to estimate Ojas.")
else:
    score01 = sum(v*w for _,v,w in parts if v is not None) / total_w
    ojas_ai = int(round(score01*100))
    st.session_state["ojas_ai"] = ojas_ai

    st.write("**Signals combined**:")
    for name, v, w in parts:
        if v is not None:
            st.write(f"- {name}: {int(v*100)}/100 (weight {w:.2f})")
        else:
            st.write(f"- {name}: _not provided_ (weight {w:.2f})")

    st.success(f"🎯 **AI-assisted Ojas Level: {ojas_ai}/100**")

st.divider()
st.page_link("app.py", label="← Back to Home", icon="🏠")
st.page_link("pages/03_ojas_boost.py", label="Go to Ojas Boost →", icon="⚡")
