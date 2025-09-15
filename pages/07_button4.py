import streamlit as st
import os
import google.generativeai as genai
import vertexai
from utils import ensure_state, hide_sidebar_nav

st.set_page_config(page_title="Art Generation - Art Videos and Images", page_icon="🎨", layout="wide",
                   initial_sidebar_state="collapsed")
hide_sidebar_nav()
ensure_state()

# Set up Vertex AI
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "../../Downloads/genojas-4c4e1a89d99d.json"
vertexai.init(project="genojas", location="us-central1")

st.title("🎨 Personalized Art Suggestions for Your Ojas & Mood")
st.caption("Generate personalized art recommendations based on your detected ojas level and mood using AI")

ojas = st.session_state.get("ojas_level")
mood = st.session_state.get("mood_label")
if ojas is None or mood is None:
    st.warning("Please detect Ojas & Mood first.", icon="⚠️")
    st.page_link("app.py", label="← Back to Home")
    st.stop()

st.success(f"Based on your ojas level: {ojas}/100 and mood: {mood}")

if st.button("Generate Art Suggestions"):
    with st.spinner("Generating personalized art suggestions..."):
        model = genai.GenerativeModel("gemini-1.5-pro")
        try:
            prompt = f"Based on an ojas level of {ojas}/100 and mood '{mood}', suggest 3 personalized art videos or images that could help improve mental wellness. For each suggestion, provide a title, a brief description, and if possible, a YouTube search link or image description. Make it inspiring and relevant to Indian culture or general wellness themes."
            response = model.generate_content(prompt)
            suggestions = response.text.strip()
            if suggestions:
                st.subheader("🎨 Your Personalized Art Suggestions")
                st.write(suggestions)
            else:
                st.error("Failed to generate suggestions.")
        except Exception as e:
            if "ResourceExhausted" in str(e):
                st.error("Quota exceeded. Please try again later or upgrade your Vertex AI plan.")
            else:
                st.error(f"An error occurred: {str(e)}")

st.divider()
st.page_link("pages/03_ojas_boost.py", label="← Back to Ojas Boost")
