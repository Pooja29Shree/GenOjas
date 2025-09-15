# app.py
import streamlit as st
from utils import ensure_state
from utils import hide_sidebar_nav, ensure_state  # (or whatever you import)
st.set_page_config(page_title="GenOjas", page_icon="🧘", layout="wide",
                   initial_sidebar_state="collapsed")

hide_sidebar_nav()   # call right after set_page_config

ensure_state()

# ---- HEADER ----
st.markdown("<h1 style='margin-bottom:0'>GenOjas</h1>"
            "<p style='margin-top:4px;color:#4b5563'>Generative AI for Youth Mental Wellness</p>",
            unsafe_allow_html=True)
st.divider()

# ---- OJAS + MOOD SUMMARY ----
c1, c2, _ = st.columns([2, 2, 1])
with c1:
    st.caption("Ojas Level")
    val = st.session_state.ojas_level or 0
    st.progress(val/100.0, text=f"{val}/100")
with c2:
    st.caption("Mood")
    st.markdown(f"### {st.session_state.mood_label or '—'}")

# ---- DETECT (NAV BUTTONS) ----
b1, b2, _ = st.columns([1, 1, 2])
with b1:
    if st.button("Detect Ojas", use_container_width=True, key="go_detect_ojas"):
        st.switch_page("pages/01_detect_ojas.py")
with b2:
    if st.button("Detect Mood", use_container_width=True, key="go_detect_mood"):
        st.switch_page("pages/02_detect_mood.py")

# ---- BOOST (NAV BUTTON) BELOW DETECT ----
st.divider()
cL, cM, cR = st.columns([1, 2, 1])
with cM:
    if st.button("Ojas Boost →", use_container_width=True, key="go_boost"):
        st.switch_page("pages/03_ojas_boost.py")


