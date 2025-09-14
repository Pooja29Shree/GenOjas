# utils.py
import streamlit as st

def ensure_state():
    st.session_state.setdefault("ojas_level", None)   # 0..100
    st.session_state.setdefault("mood_label", None)   # e.g., "calm (14 bpm)"
    st.session_state.setdefault("mood_score", None)   # -2..+2 (optional)

def score_ojas(sleep_hrs, energy, focus, appetite, social):
    """Return Ojas score 0..100 from 5 quick inputs."""
    weights = [0.25, 0.25, 0.20, 0.15, 0.15]
    vals = [
        min(max(sleep_hrs/8.0, 0), 1),   # normalize sleep vs 8h
        energy/10.0,
        focus/10.0,
        appetite/10.0,
        social/10.0,
    ]
    score = int(sum(w*v*100 for w, v in zip(weights, vals)))
    return max(0, min(100, score))

def mood_from_bpm(bpm:int):
    """Map breaths-per-minute to a mood label + score (-2..+2)."""
    if bpm < 9:   return "deeply relaxed", +2
    if bpm < 13:  return "calm", +1
    if bpm < 18:  return "neutral", 0
    if bpm < 24:  return "stressed", -1
    return "anxious", -2

def hide_sidebar_nav():
    st.markdown("""
        <style>
        /* Hide the built-in multi-page nav */
        [data-testid="stSidebarNav"] { display: none !important; }
        /* Collapse the whole sidebar column */
        section[data-testid="stSidebar"] { width: 0 !important; min-width: 0 !important; }
        </style>
    """, unsafe_allow_html=True)