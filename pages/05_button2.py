import streamlit as st
from utils import ensure_state, hide_sidebar_nav
import google.generativeai as genai
from gtts import gTTS
import os
import time

# ------------------- Streamlit Config -------------------
st.set_page_config(
    page_title="Motivational Story Generator",
    page_icon="📖",
    layout="wide",
    initial_sidebar_state="collapsed"
)

hide_sidebar_nav()
ensure_state()

# ------------------- Session State Check -------------------
st.title("🕉️ Motivational Story Generator (Itihas + TTS)")

ojas = st.session_state.get("ojas_level")
mood = st.session_state.get("mood_label")

if ojas is None or mood is None:
    st.warning("Please detect Ojas & Mood first.", icon="⚠️")
    st.page_link("app.py", label="← Back to Home")
    st.stop()

st.write(f"Inputs → Ojas: **{ojas}/100**, Mood: **{mood}**")

# ------------------- Gemini API Configuration -------------------
# Make sure to set the environment variable in your terminal first:
# Windows: set GOOGLE_API_KEY="YOUR_API_KEY"
# macOS/Linux: export GOOGLE_API_KEY="YOUR_API_KEY"
google_api_key = os.environ.get("GOOGLE_API_KEY")

if not google_api_key:
    st.error("Google API key is not set. Please set the GOOGLE_API_KEY environment variable.")
    st.stop()

genai.configure(api_key=google_api_key)
prompt = st.text_input("Enter a prompt for your story:")

if st.button("Generate Story"):
    if not prompt.strip():
        st.warning("⚠️ Please enter a prompt before generating.")
    else:
        with st.spinner("Generating story..."):
            try:
                model = genai.GenerativeModel("gemini-pro")
                response = model.generate_content(
                    f"Create a short motivational story from Indian Itihas based on this situation: {prompt}. "
                    f"Make it inspiring and easy to understand."
                )
                story_text = response.text.strip()
                st.subheader("📖 Generated Story")
                st.write(story_text)

                # ------------------- Text to Speech -------------------
                tts = gTTS(text=story_text, lang='en')
                audio_file = f"story_{int(time.time())}.mp3"  # unique filename
                tts.save(audio_file)
                st.audio(audio_file, format="audio/mp3")

            except Exception as e:
                st.error(f"An error occurred: {e}\nCheck your Gemini API key and billing status.")

# ------------------- Navigation -------------------
st.divider()
st.page_link("pages/03_ojas_boost.py", label="← Back to Ojas Boost")
