# Gunasree R - AI Engineer Portfolio

![Portfolio Preview](profile.png)

A modern, interactive portfolio website showcasing Gunasree R's work as an AI Engineer. Features an AI-powered chatbot "Hedgy" that can answer questions about her projects, experience, and skills.

## 🚀 Features

- **Modern Design**: Glassmorphism UI with smooth animations
- **Interactive Chat**: AI chatbot powered by Google's Gemini API
- **3D Background**: Three.js animated background
- **Responsive**: Mobile-first design approach
- **AI-Powered**: Dynamic content generation and project analysis
- **Scroll Snap**: Smooth section-based navigation

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rgunasree/gunasree-portfolio.git
cd gunasree-portfolio
```

### 2. Configure API Key
1.  Copy `config.example.js` to `config.js`:
    ```bash
    cp config.example.js config.js
    ```
2.  Get a free API Key from [Google AI Studio](https://aistudio.google.com/).
3.  Open `config.js` and paste your key:
    ```javascript
    const CONFIG = {
        API_KEY: 'YOUR_GEMINI_API_KEY',
        // ...
    };
    ```

### 3. Run Locally
Since this project uses ES6 modules, you need a local server.
-   **VS Code**: Install "Live Server" extension and click "Go Live".
-   **Python**:
    ```bash
    python3 -m http.server 8080
    ```
    Then open `http://localhost:8080`.

## 🚀 Deployment (Vercel)

To deploy securely **without exposing your API key**:

1.  Import this repo to [Vercel](https://vercel.com/).
2.  **Add Environment Variable**:
    -   Key: `GEMINI_API_KEY`
    -   Value: `Your_Actual_API_Key`
3.  **Override Build Command**:
    -   Go to **Settings > General > Build & Development Settings**.
    -   Toggle **Override** for **Build Command** (Leave "Output Directory" default).
    -   Enter this in the **Build Command** box:
        ```bash
        echo "const CONFIG = { API_KEY: '$GEMINI_API_KEY', GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', ANIMATION_SPEED: 15, SCROLL_THRESHOLD: 0.1 };" > config.js
        ```
4.  Deploy! Vercel will generate the secure config file during build.

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI**: Google Gemini API
- **Animations**: Three.js, CSS animations
- **Styling**: Tailwind CSS, Custom CSS
- **Charts**: Chart.js

## 📋 Projects

### 1. **FairAssess.ai** 
Bias detection engine using transformer-based models
- **Results**: 52% increase in diverse applicant rates, 43% reduction in discriminatory language
- **Tech**: Next.js 16, Hugging Face, TypeScript
- **Live**: [https://fairassess.vercel.app/](https://fairassess.vercel.app/)

### 2. **Resume Matcher**
Automated resume screening with hybrid scoring
- **Results**: 90% automation, 35% improvement in match accuracy
- **Tech**: Python, FAISS, Streamlit, BM25
- **GitHub**: [https://github.com/rgunasree/resume-matcher](https://github.com/rgunasree/resume-matcher)

### 3. **WhatShouldIWatch**
Mood-based movie recommendation engine
- **Results**: Reduced browsing time from 18 minutes to 30 seconds
- **Tech**: Serverless, TMDB API, PWA
- **Live**: [https://whatshouldiwatch-ai.vercel.app/](https://whatshouldiwatch-ai.vercel.app/)

## 💼 Experience

- **AI Engineer** - Ausweg Info Control (Jul 2025 - Present)
  - Built LLM chatbot for EMS, automating support workflows
  - Engineered RAG pipelines boosting accuracy by 72%
  - Integrated IoT telemetry reducing data lookup time by 60%

- **Data Analyst** - Ausweg Info Control (Aug 2024 - Dec 2024)
  - Optimized MQTT IIoT pipelines (38% more stable)
  - Enhanced real-time production visibility by 32%
  - Reduced data ingestion latency by 25%

- **ML Intern** - Corizo Pvt Ltd (Jun 2023)
  - Designed RNN/LSTM models for stock prediction (+24% accuracy)
  - Reduced model training time by 33% via pipeline optimization

## 🧠 Skills

**AI/ML**: Python, TensorFlow, PyTorch, scikit-learn, LLMs, RAG, NLP, Computer Vision, Deep Learning, LangChain

**Data**: SQL, MySQL, PostgreSQL, Vector DBs, FAISS, Power BI, ELK Stack, ETL

**Development**: Java, C, JavaScript, HTML/CSS, Next.js, React, Docker, Git, FastAPI

## 🤖 Meet Hedgy

Hedgy is the AI assistant chatbot that knows everything about Gunasree's work. Ask him about:
- RAG pipelines and implementation details
- FairAssess project and bias detection
- Technical skills and experience
- Hackathon achievements and leadership roles

## 🏆 Achievements

- **VISAI Hackathon 2024** - Mentored by Ashok Leyland
- **Google Cloud Gen AI Certification** - Certified by Simplilearn
- **INTI Malaysia Program** - 4-month Data Science mobility program
- **Rotaract Director** - Community Service Director

## 📞 Contact

- **Email**: gunasreeer@gmail.com
- **LinkedIn**: [https://linkedin.com/in/gunasree-r-55024224a](https://linkedin.com/in/gunasree-r-55024224a)
- **GitHub**: [https://github.com/rgunasree](https://github.com/rgunasree)
- **Twitter**: [https://x.com/gunasree__r](https://x.com/gunasree__r)
- **Instagram**: [https://www.instagram.com/gunasree__r/](https://www.instagram.com/gunasree__r/)

---

*Built with ❤️ by Gunasree R - AI Engineer specializing in RAG pipelines and efficiency optimization*