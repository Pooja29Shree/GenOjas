# GenOjas 
### *Where daya (empathy) fuels AI, and pragya (wisdom) shapes tomorrow's resilient minds*

> **GenOjas** is a user-friendly, confidential, and empathetic GenAI-powered mental wellness solution designed for youth. Built for the **Google Cloud Gen AI Exchange Hackathon**.

---

## Overview

GenOjas empowers youth to **track their well-being (Ojas)**, **understand their emotions (Bhava)**, and **build consistency (OjasStreak)** while receiving personalized caretaker guidance through **MatrikaCore**. At its heart lies **OjasBoost** — a holistic suite of seven GenAI modules that blend innovation with cultural sensitivity to transform mental health support into a journey of resilience and hope.

### The Problem We're Solving

- **Mental health stigma** in youth communities prevents seeking help
- **High therapy costs** and limited accessibility
- **Cultural disconnect** in existing Western-first wellness apps
- **Crisis detection gaps** in traditional mental health support

### Our Solution

A **confidential GenAI caretaker ecosystem** that provides:
- Stigma-free, accessible mental wellness support
- Culturally rooted modules drawing from Indian traditions
- Real-time crisis detection and personalized guidance
- Affordable alternative to traditional therapy

---

## Key Features

### Core System
- **User Onboarding** → Personalized 10-question setup for MatrikaCore customization
- **Detect Ojas** → Daily wellness level calculation (0-100) through smart questionnaires
- **Detect Bhava** → Mood tracking using breathing patterns and device sensors
- **OjasStreak** → Visual progress tracking to build consistency and motivation

### MatrikaCore GenAI (Your Digital Caretaker)
- Personalized guidance based on onboarding data and daily wellness metrics
- Intelligent routing to appropriate OjasBoost modules
- Crisis alert system with suicide risk detection
- Context-aware conversations and support

### OjasBoost - 7 Specialized GenAI Modules

| Module |  Purpose | 
|--------|---------|
| **Dhyana** |  Meditation & mindfulness guidance | 
| **Mitra** | Mindful companion chatbot | 
| **Akhyana** |  Situational storytelling AI | 
| **Kritaj** | Gratitude journaling with AI prompts | 
| **Chitra** |  Creative art generation | 
| **Raga** | Music generation | 
| **Laya** |  Dance & rhythm generation | 

---
## 📂 Repository Structure (suggested)  

```
GenOjas-main/
│── frontend/         # Next.js + Tailwind
│── backend/          # TypeScript + Cloud Functions
│── docs/             # Architecture diagrams, pipeline flows
│── README.md         # Documentation
│── package.json
│── firestore.rules   # Firestore config
│── .env.example      # API keys (Cloud + Firebase)
```
## Architecture
![GenOjas Architecture](docs/genojas-architecture.png)

### Tech Stack
- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **Backend:** Google Cloud Functions + TypeScript
- **Database:** Google Firestore (NoSQL)
- **Authentication:** Next.js built-in auth
- **Infrastructure:** Google Cloud Platform

### Google Cloud APIs Integration

| Service | Usage |
|---------|-------|
| **Vertex AI API** | Context-aware responses, scenario classification |
| **Cloud Natural Language API** | Sentiment analysis, entity extraction |
| **Cloud Speech-to-Text API** | Voice input conversion |
| **Cloud Text-to-Speech API** | Natural voice narration |
| **Imagen API** | Creative visual generation |
| **Vertex AI Embeddings API** | Personalized recommendations |
| **Cloud Firestore API** | User data and conversation storage |
| **Google Docs API** | Gratitude journal management |
| **Cloud Functions API** | Real-time triggers and alerts |

---

## Usage

### Getting Started with GenOjas

1. **Sign Up & Onboarding**
   - Complete the 10-question personalization survey
   - Set your wellness preferences and goals

2. **Daily Wellness Tracking**
   - Use "Detect Ojas" for daily wellness check-ins
   - Track your mood with "Detect Bhava"
   - Monitor progress through OjasStreak graphs

3. **Interact with MatrikaCore**
   - Get personalized guidance and recommendations
   - Access crisis support when needed
   - Navigate to appropriate OjasBoost modules

4. **Explore OjasBoost Modules**
   - **Dhyana**: Guided meditation sessions
   - **Mitra**: Chat with your AI companion
   - **Akhyana**: Generate personalized stories
   - **Kritaj**: Practice gratitude journaling

---

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---
**App**
   Navigate to [https://genojas.vercel.app/](https://genojas.vercel.app/)

---

<div align="center">

*GenOjas - Empowering minds, nurturing souls, building resilience*

</div>
