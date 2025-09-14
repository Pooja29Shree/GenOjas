# pages/01_detect_ojas.py
import streamlit as st
from utils import ensure_state, score_ojas
from utils import hide_sidebar_nav, ensure_state  # (or whatever you import)
st.set_page_config(page_title="GenOjas", page_icon="🧘", layout="wide",
                   initial_sidebar_state="collapsed")

hide_sidebar_nav()   # call right after set_page_config
st.set_page_config(page_title="Detect Ojas", page_icon="🧪", layout="wide")
ensure_state()

st.title("Detect Ojas Level")
st.caption("Fill these quick sliders, then press **Compute Ojas**.")

with st.form("ojas_form", clear_on_submit=False):
    sleep_hrs = st.slider("Sleep last night (hours)", 0.0, 12.0, 7.0, 0.5)
    energy    = st.slider("Energy right now", 0, 10, 7)
    focus     = st.slider("Focus ability", 0, 10, 7)
    appetite  = st.slider("Appetite", 0, 10, 7)
    social    = st.slider("Feeling socially connected", 0, 10, 6)
    submitted = st.form_submit_button("Compute Ojas")
    if submitted:
        st.session_state.ojas_level = score_ojas(sleep_hrs, energy, focus, appetite, social)
        st.success(f"Ojas Level set to **{st.session_state.ojas_level}/100**")

st.divider()
st.page_link("app.py", label="← Back to Home", icon="🏠")
st.page_link("pages/03_ojas_boost.py", label="Go to Ojas Boost →", icon="⚡")
