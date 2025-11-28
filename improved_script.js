// ==========================================
// PORTFOLIO APPLICATION - IMPROVED VERSION
// ==========================================

// --- CONFIGURATION & CONSTANTS ---
const CONFIG = {
    // 🔑 GEMINI API KEY CONFIGURATION:
    // Your API key is configured below. If you need to change it, replace the value here.
    // Get new keys from: https://makersuite.google.com/app/apikey
    API_KEY: "AIzaSyAV4XQvgWKeQnkEY8F_TS-3wLaOiD0bVxg", // ✅ CONFIGURED: Your Gemini API key

    GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    ANIMATION_SPEED: 25,
    CHART_HEIGHT: 300,
    SCROLL_THRESHOLD: 0.5,
    LOADING_DELAY: 1500,
    CHAT_LOADING_DELAY: 1000,
    FALLBACK_DELAY: 500
};

// DOM Selectors - Centralized for maintainability
const SELECTORS = {
    mainScroll: '#main-scroll',
    navbar: '#navbar',
    projectGrid: '#project-grid',
    skillsGrid: '#skills-grid',
    roleList: '#role-list',
    roleTitle: '#role-title',
    roleCompany: '#role-company',
    roleDate: '#role-date',
    roleBullets: '#role-bullets',
    impactChart: '#impactChart',
    aiModal: '#ai-modal',
    modalTitle: '#modal-project-title',
    modalBody: '#modal-body',
    aiSummaryBox: '#ai-summary-box',
    chatWindow: '#chat-window',
    chatMessages: '#chat-messages',
    userInput: '#user-input',
    suggestionsContainer: '#suggestions-container',
    canvasContainer: '#canvas-container',
    loading: '#loading'
};

// --- DATA MODULE ---
const PortfolioData = (() => {
    const experienceData = [
        {
            title: 'AI Engineer',
            company: 'Ausweg Info Control Pvt Ltd',
            date: 'Jul 2025 - Present',
            bullets: [
                'Built LLM chatbot for EMS, automating support workflows.',
                'Engineered RAG pipelines boosting accuracy by 72%.',
                'Integrated IoT telemetry reducing data lookup time by 60%.'
            ],
            chart: { labels: ['Efficiency', 'Accuracy', 'Speed'], data: [65, 72, 60], color: '#06b6d4' }
        },
        {
            title: 'Data Analyst',
            company: 'Ausweg Info Control Pvt Ltd',
            date: 'Aug 2024 - Dec 2024',
            bullets: [
                'Optimized MQTT IIoT pipelines (38% more stable).',
                'Enhanced real-time production visibility by 32%.',
                'Reduced data ingestion latency by 25%.'
            ],
            chart: { labels: ['Stability', 'Visibility', 'Latency'], data: [38, 32, 25], color: '#a855f7' }
        },
        {
            title: 'ML Intern',
            company: 'Corizo Pvt Ltd',
            date: 'Jun 2023',
            bullets: [
                'Designed RNN/LSTM models for stock prediction (+24% acc).',
                'Reduced model training time by 33% via pipeline optimization.',
                'Built wine-quality prediction models.'
            ],
            chart: { labels: ['Accuracy', 'Training Speed'], data: [24, 33], color: '#ffffff' }
        }
    ];

    const projects = [
        {
            id: 'fairassess',
            title: 'FairAssess.ai',
            tag: 'NLP / BIAS',
            metric: '87%',
            label: 'Confidence',
            tech: 'Next.js 16, Hugging Face, TypeScript',
            link: 'https://fairassess.vercel.app/',
            github: 'https://github.com/rgunasree/FairAssess',
            desc: 'Bias detection engine using transformer-based zero-shot models. Increased diverse applicant rates by 52% and reduced discriminatory language by 43%.',
        },
        {
            id: 'resumematcher',
            title: 'Resume Matcher',
            tag: 'RAG / SEARCH',
            metric: '75%',
            label: 'Time Saved',
            tech: 'Python, FAISS, Streamlit, BM25',
            link: 'https://github.com/rgunasree/resume-matcher',
            github: 'https://github.com/rgunasree/resume-matcher',
            desc: 'Hybrid scoring (BM25+FAISS) system. Automated 90% of initial screening and improved resume-JD match accuracy by 35%.',
        },
        {
            id: 'whatshouldiwatch',
            title: 'WhatShouldIWatch',
            tag: 'RECOMMENDER',
            metric: '30s',
            label: 'Decision Time',
            tech: 'Serverless, TMDB API, PWA',
            link: 'https://whatshouldiwatch-ai.vercel.app/',
            github: 'https://github.com/rgunasree/whatshouldiwatch-ai',
            desc: 'Mood-based recommendation engine. Reduced user browsing time from 18 minutes to 30 seconds via smart filtering.',
        }
    ];

    const skills = [
        { n: 'Python', c: 'ai' }, { n: 'TensorFlow', c: 'ai' }, { n: 'PyTorch', c: 'ai' },
        { n: 'scikit-learn', c: 'ai' }, { n: 'LLMs', c: 'ai' }, { n: 'RAG', c: 'ai' },
        { n: 'NLP', c: 'ai' }, { n: 'Computer Vision', c: 'ai' }, { n: 'Deep Learning', c: 'ai' },
        { n: 'Data Science', c: 'ai' }, { n: 'Predictive Modeling', c: 'ai' }, { n: 'LangChain', c: 'ai' },
        { n: 'SQL', c: 'data' }, { n: 'MySQL', c: 'data' }, { n: 'PostgreSQL', c: 'data' },
        { n: 'Vector DBs', c: 'data' }, { n: 'FAISS', c: 'data' }, { n: 'Power BI', c: 'data' },
        { n: 'ELK Stack', c: 'data' }, { n: 'ETL', c: 'data' }, { n: 'Google Analytics', c: 'data' },
        { n: 'Java', c: 'dev' }, { n: 'C', c: 'dev' }, { n: 'JavaScript', c: 'dev' },
        { n: 'HTML/CSS', c: 'dev' }, { n: 'Next.js', c: 'dev' }, { n: 'React', c: 'dev' },
        { n: 'Docker', c: 'dev' }, { n: 'Git', c: 'dev' }, { n: 'FastAPI', c: 'dev' },
        { n: 'Communication', c: 'soft' }, { n: 'Leadership', c: 'soft' }
    ];

    return { experienceData, projects, skills };
})();

// --- UTILITY FUNCTIONS ---
const Utils = (() => {
    /**
     * Safely gets an element by ID with error handling
     * @param {string} id - Element ID (with or without #)
     * @returns {HTMLElement|null} - The element or null if not found
     */
    const getElement = (id) => {
        const element = document.getElementById(id.replace('#', ''));
        if (!element) {
            console.warn(`Element with ID "${id}" not found`);
            return null;
        }
        return element;
    };

    /**
     * Debounces a function call
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} - Debounced function
     */
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    /**
     * Parses markdown text to HTML
     * @param {string} text - Markdown text
     * @returns {string} - HTML string
     */
    const parseMarkdown = (text) => {
        if (!text) return '';
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^\s*-\s+(.*)/gim, '• $1')
            .replace(/\n/g, '<br>');
    };

    /**
     * Escapes single quotes for use in HTML attributes
     * @param {string} str - String to escape
     * @returns {string} - Escaped string
     */
    const escapeQuotes = (str) => str.replace(/'/g, "\\'");

    return { getElement, debounce, parseMarkdown, escapeQuotes };
})();

// --- RENDERING MODULE ---
const Renderer = (() => {
    /**
     * Renders the projects grid
     */
    const renderProjects = () => {
        const projectGrid = Utils.getElement(SELECTORS.projectGrid);
        if (!projectGrid) return;

        const { projects } = PortfolioData;
        projectGrid.innerHTML = projects.map((p) => `
            <div class="glass-panel p-6 rounded-xl group relative overflow-hidden flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300">
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <div class="text-xs font-bold text-purple-400 tracking-widest">${p.tag}</div>
                        <div class="flex gap-2">
                            <a href="${p.github}" target="_blank" class="text-gray-500 hover:text-white transition-colors relative z-20 p-2 -m-2">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <a href="${p.link}" target="_blank" class="group-hover:text-cyan-400 transition-colors block relative z-20">
                        <h3 class="text-2xl font-bold text-white mb-2">${p.title}</h3>
                    </a>
                    <div class="flex items-end gap-2 mb-4">
                        <span class="text-4xl font-black text-white mono">${p.metric}</span>
                        <span class="text-xs text-gray-500 mb-2 uppercase tracking-wide">${p.label}</span>
                    </div>
                    <p class="text-sm text-gray-400 mb-4 line-clamp-3">${p.desc}</p>
                </div>
                <div class="flex justify-between items-center pt-4 border-t border-white/10 mt-auto">
                    <div class="text-xs font-mono text-gray-500">${p.tech.split(',')[0]}</div>
                    <button onclick="AIModule.generateAIAnalysis('${Utils.escapeQuotes(p.title)}')" class="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30 hover:bg-purple-500 hover:text-white transition-all whitespace-nowrap z-20 relative">
                        ✨ Deep Dive
                    </button>
                </div>
            </div>
        `).join('');
    };

    /**
     * Renders the skills grid
     */
    const renderSkills = () => {
        const skillGrid = Utils.getElement(SELECTORS.skillsGrid);
        if (!skillGrid) return;

        const { skills } = PortfolioData;
        skillGrid.innerHTML = skills.map(s => `
            <div class="bg-white/5 border border-white/5 rounded-lg p-3 text-center text-xs font-medium text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-default skill-item" data-cat="${s.c}">
                ${s.n}
            </div>
        `).join('');
    };

    /**
     * Renders experience tabs
     */
    const renderExperienceTabs = () => {
        const listEl = Utils.getElement(SELECTORS.roleList);
        if (!listEl) return;

        const { experienceData } = PortfolioData;
        listEl.innerHTML = experienceData.map((role, i) => `
            <button onclick="ExperienceModule.updateExperienceView(${i})"
                class="text-left px-6 py-4 rounded-lg transition-all w-full flex flex-col group tab-inactive" id="tab-${i}">
                <span class="font-bold text-sm tracking-wide uppercase group-hover:text-white transition-colors">${role.title}</span>
                <span class="text-xs opacity-60">${role.company}</span>
            </button>
        `).join('');
    };

    return { renderProjects, renderSkills, renderExperienceTabs };
})();

// --- EXPERIENCE MODULE ---
const ExperienceModule = (() => {
    let currentChartInstance = null;

    /**
     * Updates the experience view with the selected role
     * @param {number} index - Index of the experience data
     */
    const updateExperienceView = (index) => {
        const { experienceData } = PortfolioData;

        // Validate index
        if (index < 0 || index >= experienceData.length) {
            console.error('Invalid experience index:', index);
            return;
        }

        // Update tab states
        document.querySelectorAll('#role-list button').forEach((btn, i) => {
            if (i === index) {
                btn.classList.remove('tab-inactive');
                btn.classList.add('tab-active');
            } else {
                btn.classList.add('tab-inactive');
                btn.classList.remove('tab-active');
            }
        });

        const data = experienceData[index];

        // Update DOM elements safely
        const titleEl = Utils.getElement(SELECTORS.roleTitle);
        const companyEl = Utils.getElement(SELECTORS.roleCompany);
        const dateEl = Utils.getElement(SELECTORS.roleDate);
        const bulletsEl = Utils.getElement(SELECTORS.roleBullets);

        if (titleEl) titleEl.textContent = data.title;
        if (companyEl) companyEl.textContent = data.company;
        if (dateEl) dateEl.textContent = data.date;
        if (bulletsEl) {
            bulletsEl.innerHTML = data.bullets.map(b => `<li class="flex gap-2"><span class="text-cyan-400">▹</span>${b}</li>`).join('');
        }

        // Update chart
        updateChart(data);
    };

    /**
     * Updates the chart with new data
     * @param {Object} data - Chart data
     */
    const updateChart = (data) => {
        const ctx = Utils.getElement(SELECTORS.impactChart);
        if (!ctx) return;

        // Destroy existing chart
        if (currentChartInstance) {
            currentChartInstance.destroy();
        }

        currentChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.chart.labels,
                datasets: [{
                    label: 'Metric',
                    data: data.chart.data,
                    backgroundColor: data.chart.color + '80',
                    borderColor: data.chart.color,
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#888' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#fff' }
                    }
                }
            }
        });
    };

    return { updateExperienceView };
})();

// --- NAVIGATION MODULE ---
const NavigationModule = (() => {
    let lastScrollTop = 0;

    /**
     * Initializes navigation scroll behavior
     */
    const initScrollBehavior = () => {
        const mainScroll = Utils.getElement(SELECTORS.mainScroll);
        const navbar = Utils.getElement(SELECTORS.navbar);

        if (!mainScroll || !navbar) return;

        const handleScroll = Utils.debounce(() => {
            const scrollTop = mainScroll.scrollTop;
            if (scrollTop > lastScrollTop) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
            lastScrollTop = scrollTop;
        }, 10);

        mainScroll.addEventListener('scroll', handleScroll, { passive: true });
    };

    /**
     * Smooth scroll to section
     * @param {string} id - Section ID
     */
    const scrollToSection = (id) => {
        const element = document.querySelector(id);
        if (!element) return;

        const main = Utils.getElement(SELECTORS.mainScroll);
        if (!main) return;

        const offsetTop = element.offsetTop;
        main.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    };

    return { initScrollBehavior, scrollToSection };
})();

// --- SKILLS MODULE ---
const SkillsModule = (() => {
    /**
     * Filters skills by category
     * @param {string} category - Category to filter by ('all' for all skills)
     */
    const filterSkills = (category) => {
        // Update filter button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-cyan-500', 'text-black');
            btn.classList.add('bg-white/5', 'text-gray-400');
        });

        const targetBtn = event?.target;
        if (targetBtn) {
            targetBtn.classList.remove('bg-white/5', 'text-gray-400');
            targetBtn.classList.add('bg-cyan-500', 'text-black');
        }

        // Filter skill items
        document.querySelectorAll('.skill-item').forEach(item => {
            const display = (category === 'all' || item.dataset.cat === category) ? 'block' : 'none';
            item.style.display = display;
        });
    };

    return { filterSkills };
})();

// --- AI MODULE ---
const AIModule = (() => {
    /**
     * Generates AI analysis for a project
     * @param {string} projectTitle - Title of the project
     */
    const generateAIAnalysis = async (projectTitle) => {
        const modal = Utils.getElement(SELECTORS.aiModal);
        const title = Utils.getElement(SELECTORS.modalTitle);
        const body = Utils.getElement(SELECTORS.modalBody);

        if (!modal || !title || !body) return;

        title.textContent = projectTitle;
        modal.classList.add('active');
        body.innerHTML = '<div class="flex items-center gap-2 text-cyan-400"><div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> Thinking...</div>';

        if (!CONFIG.API_KEY) {
            body.innerHTML = `
                <div class="text-red-400 text-center">
                    <h3 class="text-lg font-bold mb-2">🔑 API Key Required</h3>
                    <p class="text-sm mb-4">Please add your Gemini API key to the CONFIG section at the top of the JavaScript file.</p>
                    <p class="text-xs text-gray-400">Get your key from: <a href="https://makersuite.google.com/app/apikey" target="_blank" class="text-cyan-400 hover:underline">Google AI Studio</a></p>
                </div>
            `;
            return;
        }

        try {
            const prompt = `
                Analyze the project "${projectTitle}" for an AI Engineering portfolio.
                Strictly follow this structure:
                1. **Problem Definition**: Clear business problem or user pain point.
                2. **Process & Architecture**: Technical workflow, tools used (RAG, LLMs, etc.), and complexity decisions.
                3. **Outcome & Impact**: Quantifiable results (metrics) and what was achieved.
                Keep it concise and professional.
            `;

            const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                throw new Error('Invalid API response structure');
            }

            body.innerHTML = Utils.parseMarkdown(text);
        } catch (error) {
            console.error('AI Analysis error:', error);
            body.innerHTML = `
                <div class="text-red-400 text-center">
                    <h3 class="text-lg font-bold mb-2">⚠️ Connection Error</h3>
                    <p class="text-sm mb-4">Unable to generate AI analysis. Please check your internet connection and API key.</p>
                    <p class="text-xs text-gray-400">If the problem persists, verify your Gemini API key is valid.</p>
                </div>
            `;
        }
    };

    /**
     * Closes the AI modal
     */
    const closeModal = () => {
        const modal = Utils.getElement(SELECTORS.aiModal);
        if (modal) {
            modal.classList.remove('active');
        }
    };

    /**
     * Generates live bio using AI
     */
    const generateLiveBio = async () => {
        const box = Utils.getElement(SELECTORS.aiSummaryBox);
        if (!box) return;

        box.innerHTML = `
            <div class="flex items-center gap-2 text-cyan-400 font-mono text-sm">
                <span class="animate-spin">⟳</span> ESTABLISHING UPLINK...
            </div>
        `;

        try {
            if (!CONFIG.API_KEY) {
                throw new Error('No API key provided');
            }

            const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: "Write a short, punchy, 2-sentence professional bio for Gunasree R, an AI Engineer. Focus on her resume strengths like RAG, Efficiency, and Engineering. Make it sound modern and high-tech. Do not use quotes."
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                throw new Error('Invalid API response');
            }

            const formattedText = text.replace(/(AI Engineer|RAG|LLMs|Efficiency|Engineering)/g, '<strong class="text-white">$1</strong>');
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = formattedText;
            const cleanText = tempDiv.innerHTML;

            box.innerHTML = '';
            typeWriter(SELECTORS.aiSummaryBox, cleanText, CONFIG.ANIMATION_SPEED);

        } catch (error) {
            console.error('Bio generation error:', error);
            const fallbackText = "Expert <strong class='text-white'>AI Engineer</strong> specializing in <strong class='text-white'>RAG Pipelines</strong> and production-grade systems. I turn complex data into actionable intelligence with measurable <strong class='text-white'>Efficiency</strong>.";
            box.innerHTML = '';
            typeWriter(SELECTORS.aiSummaryBox, fallbackText, CONFIG.ANIMATION_SPEED);
        }
    };

    /**
     * Typewriter effect for text animation
     * @param {string} elementId - ID of element to animate
     * @param {string} text - Text to animate
     * @param {number} speed - Animation speed
     */
    const typeWriter = (elementId, text, speed = CONFIG.ANIMATION_SPEED) => {
        const element = Utils.getElement(elementId);
        if (!element) return;

        element.innerHTML = `<span class="text-cyan-400 font-bold mr-2">></span>`;

        let i = 0;
        const type = () => {
            if (i < text.length) {
                if (text.substring(i).startsWith('<strong')) {
                    const endTagIndex = text.indexOf('</strong>', i);
                    if (endTagIndex !== -1) {
                        element.innerHTML += text.substring(i, endTagIndex + 9);
                        i = endTagIndex + 9;
                    }
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            } else {
                element.innerHTML += `<span class="cursor-blink"></span>`;
            }
        };
        type();
    };

    return { generateAIAnalysis, closeModal, generateLiveBio };
})();

// --- CHAT MODULE ---
const ChatModule = (() => {
    let chatOpen = false;

    const promptPool = [
        "Summarize skills", "Explain FairAssess", "Why hire her?",
        "Experience with RAG?", "Top 3 achievements", "Tech stack overview",
        "Tell me about Resume Matcher", "Hackathon details", "Leadership roles?",
        "What is 'Hedgy'?"
    ];

    // Fallback knowledge base for offline responses
    const fallbackKnowledge = {
        'fairassess': `**FairAssess.ai** - Gunasree's bias detection engine using transformer-based models. 
        
**Key Results:**
• Increased diverse applicant rates by 52%
• Reduced discriminatory language by 43%
• Built with Next.js 16, Hugging Face, TypeScript

**Impact:** Helps organizations make fairer hiring decisions through AI-powered bias detection.`,
        
        'rag': `**RAG Pipeline Experience:**
• Built RAG pipelines boosting accuracy by 72% at Ausweg
• Implemented vector databases (FAISS, Chroma)
• Used LangChain for production systems
• Hybrid scoring with BM25 + FAISS for resume matching

**Technical Stack:** Python, LangChain, Vector DBs, FAISS, PostgreSQL`,
        
        'resume matcher': `**Resume Matcher** - Automated resume screening system.
        
**Features:**
• Hybrid scoring (BM25 + FAISS)
• 90% automation of initial screening
• 35% improvement in resume-JD match accuracy
• Built with Python, FAISS, Streamlit

**Business Impact:** Saves HR teams significant time in the hiring process.`,
        
        'experience': `**Current Role:** AI Engineer at Ausweg Info Control (Jul 2025-Present)

**Key Achievements:**
• Built LLM chatbot for EMS, automating support workflows
• Engineered RAG pipelines (72% accuracy boost)
• Integrated IoT telemetry (60% faster data lookup)

**Previous:** Data Analyst (Aug-Dec 2024) - Optimized MQTT IIoT pipelines`,
        
        'skills': `**AI/ML Skills:** Python, TensorFlow, PyTorch, scikit-learn, LLMs, RAG, NLP, Computer Vision, Deep Learning, LangChain

**Data Skills:** SQL, MySQL, PostgreSQL, Vector DBs, FAISS, Power BI, ELK Stack, ETL

**Development:** Java, C, JavaScript, Next.js, React, Docker, FastAPI

**Soft Skills:** Communication, Leadership`,
        
        'achievements': `**Top 3 Achievements:**

1. **VISAI Hackathon 2024** - Mentored by Ashok Leyland, built innovative AI solutions

2. **Google Cloud Gen AI Certification** - Certified by Simplilearn in Generative AI

3. **INTI Malaysia Program** - 4-month mobility program focusing on real-world Data Science

**Leadership:** Rotaract Director - Community Service Director leading tech-driven social initiatives`,
        
        'whatshouldiwatch': `**WhatShouldIWatch** - Mood-based movie recommendation engine.
        
**Results:**
• Reduced user browsing time from 18 minutes to 30 seconds
• Smart filtering based on user mood/preferences
• Built with Serverless architecture, TMDB API, PWA technology

**Impact:** Helps users quickly find movies they'll enjoy without endless scrolling.`,
        
        'ai engineer': `**Gunasree R** - AI Engineer specializing in:
• **LLMs & RAG Pipelines** - Production-grade systems
• **IoT Analytics** - Real-time data processing
• **Bias Detection** - Fair AI systems (FairAssess)
• **Efficiency Optimization** - Measurable business impact

**Focus:** Merging predictive modeling with engineering excellence for measurable results.`
    };

    /**
     * Gets fallback response for common questions
     * @param {string} message - User message
     * @returns {string|null} - Fallback response or null
     */
    const getFallbackResponse = (message) => {
        const lowerMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(fallbackKnowledge)) {
            if (lowerMessage.includes(key) || lowerMessage.includes(key.replace(' ', ''))) {
                return response;
            }
        }

        // General responses for unmatched queries
        if (lowerMessage.includes('who') && lowerMessage.includes('you')) {
            return `Hi! I'm **Hedgy** 🦔, Gunasree's AI portfolio assistant. I know everything about her work in **AI Engineering**, **RAG pipelines**, **bias detection**, and **efficiency optimization**. What would you like to know?`;
        }

        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('hire')) {
            return `For contact information, please visit the Contact section above. Gunasree is available for AI/ML engineering roles, RAG system development, and efficiency optimization projects. She specializes in turning complex data into actionable intelligence!`;
        }

        return null;
    };

    /**
     * Toggles chat window visibility
     */
    const toggleChat = () => {
        chatOpen = !chatOpen;
        const win = Utils.getElement(SELECTORS.chatWindow);
        if (win) {
            if (chatOpen) {
                win.classList.add('open');
            } else {
                win.classList.remove('open');
            }
        }
    };

    /**
     * Gets random prompt suggestions
     * @param {number} count - Number of prompts to return
     * @returns {Array} - Array of random prompts
     */
    const getRandomPrompts = (count = 3) => {
        const shuffled = [...promptPool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    /**
     * Renders prompt suggestions
     */
    const renderPrompts = () => {
        const container = Utils.getElement(SELECTORS.suggestionsContainer);
        if (!container) return;

        const prompts = getRandomPrompts();
        container.innerHTML = prompts.map(p => {
            const safePrompt = Utils.escapeQuotes(p);
            return `
                <button onclick="ChatModule.sendQuickMessage('${safePrompt}')" class="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white/5 text-cyan-400 text-xs border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all font-medium">
                    ✨ ${p}
                </button>
            `;
        }).join('');
    };

    /**
     * Sends a quick message from suggestions
     * @param {string} msg - Message to send
     */
    const sendQuickMessage = (msg) => {
        const input = Utils.getElement(SELECTORS.userInput);
        if (input) {
            input.value = msg;
            sendMessage();
            setTimeout(renderPrompts, 500);
        }
    };

    /**
     * Sends a message to the chat
     */
    const sendMessage = async () => {
        const input = Utils.getElement(SELECTORS.userInput);
        const msgs = Utils.getElement(SELECTORS.chatMessages);

        if (!input || !msgs) return;

        const text = input.value.trim();
        if (!text) return;

        msgs.innerHTML += `<div class="msg user">${text}</div>`;
        input.value = '';
        msgs.scrollTop = msgs.scrollHeight;

        const loadingId = 'load-' + Date.now();
        msgs.innerHTML += `<div class="msg ai animate-pulse" id="${loadingId}">...</div>`;

        if (!CONFIG.API_KEY) {
            const loadingEl = document.getElementById(loadingId);
            if (loadingEl) loadingEl.remove();

            const errorResponse = `🔑 <strong>API Key Required</strong><br><br>Please add your Gemini API key to the CONFIG section at the top of the JavaScript file to enable AI chat functionality.<br><br>Get your key from: <a href="https://makersuite.google.com/app/apikey" target="_blank" class="text-cyan-400 hover:underline">Google AI Studio</a>`;
            msgs.innerHTML += `<div class="msg ai">${errorResponse}</div>`;
            msgs.scrollTop = msgs.scrollHeight;
            renderPrompts();
            return;
        }

        try {
            const contextData = `
                EXPERIENCE: ${JSON.stringify(PortfolioData.experienceData)}
                PROJECTS: ${JSON.stringify(PortfolioData.projects)}
                SKILLS: ${JSON.stringify(PortfolioData.skills)}
            `;

            const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: text }] }],
                    systemInstruction: {
                        parts: [{
                            text: `You are Hedgy 🦔, Gunasree's portfolio AI assistant. Answer strictly based on the following resume data: ${contextData}. Keep answers concise, friendly, and professional. Use bolding (**like this**) for key metrics and skills. Do NOT mention contact info unless explicitly asked.`
                        }]
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            const loadingEl = document.getElementById(loadingId);
            if (loadingEl) loadingEl.remove();

            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!rawText) {
                throw new Error('Invalid API response');
            }

            const formattedText = Utils.parseMarkdown(rawText);
            msgs.innerHTML += `<div class="msg ai">${formattedText}</div>`;
            msgs.scrollTop = msgs.scrollHeight;
            renderPrompts();

        } catch (error) {
            console.error('Chat error:', error);

            setTimeout(() => {
                const loadingEl = document.getElementById(loadingId);
                if (loadingEl) loadingEl.remove();

                // Try fallback response first
                const fallbackResponse = getFallbackResponse(text);
                
                if (fallbackResponse) {
                    const formattedText = Utils.parseMarkdown(fallbackResponse);
                    msgs.innerHTML += `<div class="msg ai">🤖 <strong>Offline Mode</strong><br><br>${formattedText}<br><br><em>Note: This is a cached response. For more detailed answers, please ensure your API key is configured correctly.</em></div>`;
                } else {
                    // Enhanced error response with debugging info
                    const isApiKeyError = error.message.includes('401') || error.message.includes('403');
                    const isNetworkError = error.message.includes('fetch');
                    
                    let errorResponse = `⚠️ <strong>Connection Error</strong><br><br>`;
                    
                    if (isApiKeyError) {
                        errorResponse += `🔑 <strong>API Key Issue</strong><br>Your Gemini API key may be invalid or expired. Please check your API key configuration.<br><br>`;
                        errorResponse += `Get a new key from: <a href="https://makersuite.google.com/app/apikey" target="_blank" class="text-cyan-400 hover:underline">Google AI Studio</a><br><br>`;
                    } else if (isNetworkError) {
                        errorResponse += `📡 <strong>Network Issue</strong><br>Unable to connect to Gemini API. Please check your internet connection.<br><br>`;
                    } else {
                        errorResponse += `🤖 <strong>Service Unavailable</strong><br>The AI service is temporarily unavailable.<br><br>`;
                    }
                    
                    errorResponse += `I still know about Gunasree's work! Try asking about:<br>• RAG pipelines<br>• FairAssess project<br>• Her experience<br>• Technical skills`;
                    
                    msgs.innerHTML += `<div class="msg ai">${errorResponse}</div>`;
                }
                msgs.scrollTop = msgs.scrollHeight;
                renderPrompts();
            }, CONFIG.FALLBACK_DELAY);
        }
    };

    return { toggleChat, renderPrompts, sendQuickMessage, sendMessage };
})();

// --- ANIMATION MODULE ---
const AnimationModule = (() => {
    /**
     * Initializes Three.js background animation
     */
    const initThreeJS = () => {
        const container = Utils.getElement(SELECTORS.canvasContainer);
        if (!container) return;

        try {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            const geometry = new THREE.IcosahedronGeometry(2, 60);
            const material = new THREE.ShaderMaterial({
                vertexShader: `
                    uniform float uTime;
                    varying float vNoise;
                    void main() {
                        vec3 pos = position;
                        pos += normal * sin(pos.x * 2.0 + uTime) * 0.1;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                        vNoise = pos.z;
                    }
                `,
                fragmentShader: `
                    varying float vNoise;
                    void main() {
                        gl_FragColor = vec4(0.02, 0.71, 0.83, 0.3);
                    }
                `,
                uniforms: { uTime: { value: 0 } },
                wireframe: true,
                transparent: true
            });

            const sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);
            camera.position.z = 6;

            let animationId;
            const animate = () => {
                animationId = requestAnimationFrame(animate);
                material.uniforms.uTime.value += 0.01;
                sphere.rotation.y += 0.002;
                renderer.render(scene, camera);
            };
            animate();

            // Handle window resize
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            // Cleanup function
            return () => {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                window.removeEventListener('resize', handleResize);
                if (container.contains(renderer.domElement)) {
                    container.removeChild(renderer.domElement);
                }
                renderer.dispose();
            };

        } catch (error) {
            console.error('Three.js initialization failed:', error);
        }
    };

    /**
     * Initializes scroll reveal animations
     */
    const initScrollReveal = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    // Update active navigation link
                    const id = entry.target.getAttribute('id');
                    document.querySelectorAll('.nav-link').forEach(link => {
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, { threshold: CONFIG.SCROLL_THRESHOLD });

        document.querySelectorAll('.reveal-section').forEach(section => {
            observer.observe(section);
        });
    };

    return { initThreeJS, initScrollReveal };
})();

// --- INITIALIZATION ---
const initContent = () => {
    try {
        Renderer.renderProjects();
        Renderer.renderSkills();
        Renderer.renderExperienceTabs();
        ExperienceModule.updateExperienceView(0);
    } catch (error) {
        console.error('Content initialization failed:', error);
    }
};

// --- GLOBAL EXPORTS ---
window.ExperienceModule = ExperienceModule;
window.NavigationModule = NavigationModule;
window.SkillsModule = SkillsModule;
window.AIModule = AIModule;
window.ChatModule = ChatModule;

// --- BOOTSTRAP ---
window.onload = () => {
    const loadingScreen = Utils.getElement(SELECTORS.loading);

    // Fade out loading screen
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 1000);
    }

    try {
        // Initialize modules
        AnimationModule.initThreeJS();
        NavigationModule.initScrollBehavior();
        AnimationModule.initScrollReveal();

        // Render content
        initContent();

        // Initialize chat
        if (typeof ChatModule.renderPrompts === 'function') {
            ChatModule.renderPrompts();
        }

    } catch (error) {
        console.error('Application initialization failed:', error);
    }
};

// --- LEGACY COMPATIBILITY FUNCTIONS ---
window.scrollToSection = NavigationModule.scrollToSection;
window.filterSkills = SkillsModule.filterSkills;
window.generateLiveBio = AIModule.generateLiveBio;
window.toggleChat = ChatModule.toggleChat;
window.sendMessage = ChatModule.sendMessage;
window.closeModal = AIModule.closeModal;