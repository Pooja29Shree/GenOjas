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

def hide_sidebar_nav():
    import streamlit as st
    st.markdown(
        """
        <style>
        section[data-testid="stSidebar"] { display: none !important; }
        </style>
        """,
        unsafe_allow_html=True,
    )

def mood_from_bpm(bpm:int)->str:
    if bpm is None: return "unknown"
    if bpm <= 9:  return f"calm ({bpm} bpm)"
    if bpm <= 14: return f"easy ({bpm} bpm)"
    if bpm <= 18: return f"brisk ({bpm} bpm)"
    return f"tense ({bpm} bpm)"