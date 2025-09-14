import streamlit as st
from utils import ensure_state, hide_sidebar_nav
st.set_page_config(page_title="Button 6", page_icon="6️⃣", layout="wide",
                   initial_sidebar_state="collapsed")
hide_sidebar_nav(); ensure_state()

st.title("Button 6")
ojas = st.session_state.get("ojas_level"); mood = st.session_state.get("mood_label")
if ojas is None or mood is None:
    st.warning("Please detect Ojas & Mood first.", icon="⚠️")
    st.page_link("app.py", label="← Back to Home"); st.stop()

st.write(f"Inputs → Ojas: **{ojas}/100**, Mood: **{mood}**")
# TODO

st.divider()
st.page_link("pages/03_ojas_boost.py", label="← Back to Ojas Boost")
