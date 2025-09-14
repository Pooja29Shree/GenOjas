# pages/03_ojas_boost.py
import streamlit as st
from utils import ensure_state, hide_sidebar_nav

st.set_page_config(page_title="Ojas Boost", page_icon="⚡", layout="wide",
                   initial_sidebar_state="collapsed")
hide_sidebar_nav()
ensure_state()

st.title("Ojas Boost")

# Require inputs
ojas = st.session_state.get("ojas_level")
mood = st.session_state.get("mood_label")
if ojas is None or mood is None:
    st.warning("Please detect **Ojas Level** and **Mood** first.", icon="⚠️")
    st.page_link("app.py", label="← Back to Home")
    st.stop()

st.markdown(f"**Inputs for all features** — Ojas Level: **{ojas}/100**, Mood: **{mood}**")

colL, colR = st.columns(2)
with colL:
    if st.button("Button 1", use_container_width=True):
        st.switch_page("pages/04_button1.py")
    if st.button("Button 2", use_container_width=True):
        st.switch_page("pages/05_button2.py")
    if st.button("Button 3", use_container_width=True):
        st.switch_page("pages/06_button3.py")
with colR:
    if st.button("Button 4", use_container_width=True):
        st.switch_page("pages/07_button4.py")
    if st.button("Button 5", use_container_width=True):
        st.switch_page("pages/08_button5.py")
    if st.button("Button 6", use_container_width=True):
        st.switch_page("pages/09_button6.py")

st.divider()
st.page_link("app.py", label="← Back to Home", icon="🏠")
