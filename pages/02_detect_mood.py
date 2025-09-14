# pages/02_detect_mood.py
import streamlit as st
import time
from utils import ensure_state, mood_from_bpm
from utils import hide_sidebar_nav, ensure_state  # (or whatever you import)
st.set_page_config(page_title="GenOjas", page_icon="🧘", layout="wide",
                   initial_sidebar_state="collapsed")

hide_sidebar_nav()   # call right after set_page_config
st.set_page_config(page_title="Detect Mood", page_icon="🙂", layout="wide")
ensure_state()

st.title("Detect Mood")
st.caption("Count your breaths (inhale+exhale=1) for **30 seconds**, then we'll estimate your mood.")

# simple breath counter
if "timer_start" not in st.session_state:
    st.session_state.timer_start = None
    st.session_state.breaths = 0

c1, c2, c3 = st.columns(3)
with c1:
    if st.button("Start 30s"):
        st.session_state.timer_start = time.time()
        st.session_state.breaths = 0
with c2:
    if st.button("Breath +1"):
        st.session_state.breaths += 1
with c3:
    if st.button("Reset"):
        st.session_state.timer_start = None
        st.session_state.breaths = 0

if st.session_state.timer_start:
    elapsed = time.time() - st.session_state.timer_start
    remaining = max(0, 30 - int(elapsed))
    st.info(f"⏱️ {remaining}s left • breaths counted: {st.session_state.breaths}")
    if elapsed >= 30:
        bpm = st.session_state.breaths * 2
        mood, score = mood_from_bpm(bpm)
        st.session_state.mood_label = f"{mood} ({bpm} bpm)"
        st.session_state.mood_score = score
        st.session_state.timer_start = None
        st.success(f"Mood set to **{st.session_state.mood_label}**")

# manual override (optional)
st.selectbox("Or pick a mood manually", ["(no change)", "deeply relaxed", "calm", "neutral", "stressed", "anxious"], key="manual_mood")
if st.session_state.manual_mood != "(no change)":
    st.session_state.mood_label = st.session_state.manual_mood

st.divider()
st.page_link("app.py", label="← Back to Home", icon="🏠")
st.page_link("pages/03_ojas_boost.py", label="Go to Ojas Boost →", icon="⚡")
