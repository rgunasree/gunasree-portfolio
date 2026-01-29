// ==========================================
// PORTFOLIO APPLICATION - FIXED VERSION
// ==========================================

// --- CONFIGURATION & CONSTANTS ---
// --- CONFIGURATION ---
// CONFIG is now loaded from config.js

// DOM Selectors
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
    loading: '#loading',
    bioButton: '#bio-btn' // Added ID for the button
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

// --- THEME MODULE ---
const ThemeModule = (() => {
    const toggleTheme = () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    };

    const updateIcon = (theme) => {
        const icon = document.getElementById('theme-icon');
        if (!icon) return;
        if (theme === 'light') {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
        } else {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        }
    };

    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    };

    return { toggleTheme, initTheme };
})();
window.toggleTheme = ThemeModule.toggleTheme;

// --- UTILITY FUNCTIONS ---
const Utils = (() => {
    const getElement = (id) => {
        const element = document.getElementById(id.replace('#', ''));
        if (!element) console.warn(`Element with ID "${id}" not found`);
        return element;
    };

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const parseMarkdown = (text) => {
        if (!text) return '';
        // 1. Escape HTML (Prevent XSS)
        const safeText = text.replace(/[&<>"']/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[tag]));

        // 2. Render Markdown
        return safeText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^\s*-\s+(.*)/gim, '• $1')
            .replace(/\n/g, '<br>');
    };

    const escapeQuotes = (str) => {
        return str
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"');
    };
    return { getElement, debounce, parseMarkdown, escapeQuotes };
})();

// --- RENDERING MODULE ---
const Renderer = (() => {
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
                            <a href="${p.github}" target="_blank" class="text-gray-500 hover:text-white transition-colors relative z-20 p-2 -m-2"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
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
    const updateExperienceView = (index) => {
        const { experienceData } = PortfolioData;
        if (index < 0 || index >= experienceData.length) return;
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
        const titleEl = Utils.getElement(SELECTORS.roleTitle);
        const companyEl = Utils.getElement(SELECTORS.roleCompany);
        const dateEl = Utils.getElement(SELECTORS.roleDate);
        const bulletsEl = Utils.getElement(SELECTORS.roleBullets);
        if (titleEl) titleEl.textContent = data.title;
        if (companyEl) companyEl.textContent = data.company;
        if (dateEl) dateEl.textContent = data.date;
        if (bulletsEl) bulletsEl.innerHTML = data.bullets.map(b => `<li class="flex gap-2"><span class="text-cyan-400">▹</span>${b}</li>`).join('');
        updateChart(data);
    };

    const updateChart = (data) => {
        const ctx = Utils.getElement(SELECTORS.impactChart);
        if (!ctx) return;
        if (currentChartInstance) currentChartInstance.destroy();
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
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888' } },
                    x: { grid: { display: false }, ticks: { color: '#fff' } }
                }
            }
        });
    };
    return { updateExperienceView };
})();

// --- NAVIGATION MODULE ---
const NavigationModule = (() => {
    let lastScrollTop = 0;
    const initScrollBehavior = () => {
        const mainScroll = Utils.getElement(SELECTORS.mainScroll);
        const navbar = Utils.getElement(SELECTORS.navbar);
        if (!mainScroll || !navbar) return;
        const handleScroll = Utils.debounce(() => {
            const scrollTop = mainScroll.scrollTop;
            if (scrollTop > lastScrollTop) navbar.classList.add('nav-hidden');
            else navbar.classList.remove('nav-hidden');
            lastScrollTop = scrollTop;
        }, 10);
        mainScroll.addEventListener('scroll', handleScroll, { passive: true });
    };
    const scrollToSection = (id) => {
        const element = document.querySelector(id);
        if (!element) return;
        const main = Utils.getElement(SELECTORS.mainScroll);
        main.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    };
    return { initScrollBehavior, scrollToSection };
})();

// --- SKILLS MODULE ---
const SkillsModule = (() => {
    const filterSkills = (category) => {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-cyan-500', 'text-black');
            btn.classList.add('bg-white/5', 'text-gray-400');
        });
        if (event?.target) {
            event.target.classList.remove('bg-white/5', 'text-gray-400');
            event.target.classList.add('bg-cyan-500', 'text-black');
        }
        document.querySelectorAll('.skill-item').forEach(item => {
            item.style.display = (category === 'all' || item.dataset.cat === category) ? 'block' : 'none';
        });
    };
    return { filterSkills };
})();

// --- AI MODULE (FIXED) ---
const AIModule = (() => {
    let currentTypewriterTimeout = null;
    let isGeneratingBio = false;

    const generateAIAnalysis = async (projectTitle) => {
        const modal = Utils.getElement(SELECTORS.aiModal);
        const title = Utils.getElement(SELECTORS.modalTitle);
        const body = Utils.getElement(SELECTORS.modalBody);

        if (!modal) return;
        title.textContent = projectTitle;
        modal.classList.add('active');
        body.innerHTML = '<div class="flex items-center gap-2 text-cyan-400"><div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> Connecting to Gemini...</div>';

        if (window.location.protocol === 'file:') {
            body.innerHTML = `
                <div class="text-red-400 text-center">
                    <h3 class="text-lg font-bold mb-2">⚠️ Local File Error</h3>
                    <p class="text-sm">Google's API blocks requests from "file://" for security (CORS).</p>
                    <p class="text-sm mt-2 text-gray-400">Please use <strong>VS Code Live Server</strong> to run this.</p>
                </div>`;
            return;
        }

        try {
            const prompt = `Analyze "${projectTitle}" for an AI Engineer portfolio. Strict sections: 1. Problem, 2. Tech Stack, 3. Impact (Metrics). Concise.`;
            const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) {
                const errText = await response.text();
                console.error('API Error Details:', errText);
                throw new Error(`Status: ${response.status}`);
            }
            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) throw new Error('Empty response');

            body.innerHTML = Utils.parseMarkdown(text);
        } catch (error) {
            console.error('AI Error:', error);
            body.innerHTML = `<div class="text-red-400 text-center"><h3>⚠️ Analysis Failed</h3><p class="text-sm">${error.message}</p></div>`;
        }
    };

    const closeModal = () => {
        const modal = Utils.getElement(SELECTORS.aiModal);
        if (modal) modal.classList.remove('active');
    };

    const generateLiveBio = async () => {
        // PREVENT SPAM CLICKS (Fixes race condition)
        if (isGeneratingBio) return;

        const box = Utils.getElement(SELECTORS.aiSummaryBox);
        const btn = document.querySelector('button[onclick="generateLiveBio()"]');

        if (!box) return;

        // Clear previous timeout immediately
        if (currentTypewriterTimeout) {
            clearTimeout(currentTypewriterTimeout);
            currentTypewriterTimeout = null;
        }

        isGeneratingBio = true;
        if (btn) btn.style.opacity = "0.5";

        box.innerHTML = `<div class="flex items-center gap-2 text-cyan-400 font-mono text-sm"><span class="animate-spin">⟳</span> GENERATING NEW BIO...</div>`;

        try {
            if (window.location.protocol === 'file:') throw new Error('CORS_ERROR');

            const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "Write a short, punchy, 2-sentence professional bio for Gunasree R, AI Engineer. Focus on RAG, Efficiency, and Engineering. Modern tone." }] }]
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                console.error('Bio API Error:', errText);
                throw new Error(`API_${response.status}`);
            }
            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error generating bio.";

            // Format text
            const formatted = text.replace(/(AI Engineer|RAG|Efficiency)/g, '<strong class="text-white">$1</strong>');

            // CLEAR BOX AGAIN before typing starts (Safety measure)
            box.innerHTML = '';
            typeWriter(SELECTORS.aiSummaryBox, formatted, CONFIG.ANIMATION_SPEED);

        } catch (error) {
            if (error.message !== 'CORS_ERROR') {
                console.error('Bio Error:', error);
            }
            let msg = "Expert <strong class='text-white'>AI Engineer</strong>. (Offline Mode)";

            if (error.message === 'CORS_ERROR') {
                msg = "<span class='text-red-400'>Error: Cannot run from local file. Use Live Server.</span>";
            }
            box.innerHTML = '';
            typeWriter(SELECTORS.aiSummaryBox, msg, CONFIG.ANIMATION_SPEED);
        } finally {
            // Re-enable button
            isGeneratingBio = false;
            if (btn) btn.style.opacity = "1";
        }
    };

    const typeWriter = (elementId, text, speed) => {
        const element = Utils.getElement(elementId);
        if (!element) return;

        element.innerHTML = `<span class="text-cyan-400 font-bold mr-2">></span>`;
        let i = 0;

        const type = () => {
            if (i < text.length) {
                if (text.substring(i).startsWith('<strong')) {
                    const end = text.indexOf('</strong>', i);
                    if (end !== -1) {
                        element.innerHTML += text.substring(i, end + 9);
                        i = end + 9;
                    }
                } else if (text.substring(i).startsWith('<span')) {
                    const end = text.indexOf('</span>', i);
                    if (end !== -1) {
                        element.innerHTML += text.substring(i, end + 7);
                        i = end + 7;
                    }
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                currentTypewriterTimeout = setTimeout(type, speed);
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
    const promptPool = ["Summarize skills", "Explain FairAssess", "Why hire her?", "Experience with RAG?", "Top achievements"];
    const fallbackKnowledge = {
        'fairassess': `**FairAssess.ai** - Bias detection engine. +52% diverse applicants.`,
        'rag': `**RAG Experience:** Built pipelines at Ausweg (72% accuracy boost) using FAISS & LangChain.`,
        'skills': `**Skills:** Python, RAG, LLMs, SQL, Next.js, Docker.`,
        'achievements': `**Top Achievements:**\n• Built EMS Chatbot (Auto-support)\n• 72% RAG Accuracy Boost\n• FairAssess.ai (Bias Detection)`,
        'hire': `**Why Hire Her?**\n• Proven RAG & LLM expertise\n• Full-stack (Next.js + Python)\n• Results-driven (Metrics-focused)`,
        'portfolio': `**About this Website:**\n• Built with **Vanilla JS, Tailwind CSS, & Three.js**\n• **No Frameworks** (Lightweight)\n• Features: **Gemini 2.0 Flash** for AI, 3D Background, Glassmorphism.`,
        'website': `**About this Website:**\n• Built with **Vanilla JS, Tailwind CSS, & Three.js**\n• **No Frameworks** (Lightweight)\n• Features: **Gemini 2.0 Flash** for AI, 3D Background, Glassmorphism.`,
        'about': `**About Gunasree:**\n• **AI Engineer** with 1+ years exp.\n• **8.1 CGPA**\n• Expert in **LLMs, RAG, & IoT**.\n• Passionate about building scalable AI systems.`,
        'gunasree': `**About Gunasree:**\n• **AI Engineer** with 1+ years exp.\n• **8.1 CGPA**\n• Expert in **LLMs, RAG, & IoT**.\n• Passionate about building scalable AI systems.`
    };

    const PORTFOLIO_CONTEXT = `
    WEBSITE TECH STACK:
    - Core: Vanilla JavaScript (No heavy frameworks like React/Angular for the main site).
    - Styling: Tailwind CSS (Utility-first).
    - 3D Graphics: Three.js (Interactive background).
    - AI Integration: Google Gemini 2.0 Flash API (Bio Generator, Deep Dive, Chatbot).
    - Hosting: Localhost / Vercel.
    - Key Features: Glassmorphism UI, Real-time AI analysis, Typewriter effects, Scroll-triggered animations.
    `;

    const PERSONAL_CONTEXT = `
    PROFILE:
    - Name: Gunasree R
    - Role: AI Engineer
    - Experience: 1+ Years (Ausweg Info Control, Corizo)
    - Education: 8.1 CGPA
    - Key Skills: LLMs, RAG Pipelines, IoT Analytics, Python, Next.js, Docker.
    - Key Projects: FairAssess.ai (Bias Detection), Resume Matcher (RAG), WhatShouldIWatch (Recommender).
    - Soft Skills: Leadership, Communication.
    `;

    const getFallbackResponse = (msg) => {
        const lower = msg.toLowerCase();
        for (const [key, res] of Object.entries(fallbackKnowledge)) {
            if (lower.includes(key)) return res;
        }
        return `I am Hedgy 🦔. Ask me about Gunasree's RAG pipelines or projects!`;
    };

    const toggleChat = () => {
        chatOpen = !chatOpen;
        const win = Utils.getElement(SELECTORS.chatWindow);
        if (win) chatOpen ? win.classList.add('open') : win.classList.remove('open');
    };

    const renderPrompts = () => {
        const container = Utils.getElement(SELECTORS.suggestionsContainer);
        if (!container) return;
        container.innerHTML = promptPool.sort(() => 0.5 - Math.random()).slice(0, 3).map(p =>
            `<button onclick="ChatModule.sendQuickMessage('${Utils.escapeQuotes(p)}')" class="px-3 py-1.5 rounded-lg bg-white/5 text-cyan-400 text-xs border border-white/10 hover:bg-cyan-500/20 transition-all">✨ ${p}</button>`
        ).join('');
    };

    const sendQuickMessage = (msg) => {
        const input = Utils.getElement(SELECTORS.userInput);
        if (input) { input.value = msg; sendMessage(); setTimeout(renderPrompts, 500); }
    };

    const sendMessage = async () => {
        const input = Utils.getElement(SELECTORS.userInput);
        const msgs = Utils.getElement(SELECTORS.chatMessages);
        if (!input || !msgs || !input.value.trim()) return;

        const text = input.value.trim();
        msgs.innerHTML += `<div class="msg user">${text}</div>`;
        input.value = '';
        msgs.scrollTop = msgs.scrollHeight;

        const loadId = 'load-' + Date.now();
        msgs.innerHTML += `<div class="msg ai animate-pulse" id="${loadId}">...</div>`;

        try {
            if (window.location.protocol === 'file:') throw new Error('CORS');

            const context = `RESUME DATA: ${JSON.stringify(PortfolioData)}`;
            const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: text }] }],
                    systemInstruction: {
                        parts: [{
                            text: `You are Hedgy 🦔, the AI assistant for Gunasree's portfolio. 
                    
                    CONTEXT:
                    ${PORTFOLIO_CONTEXT}
                    
                    ${PERSONAL_CONTEXT}
                    
                    RESUME DATA:
                    ${JSON.stringify(PortfolioData)}
                    
                    INSTRUCTIONS:
                    - Be helpful, professional, yet slightly witty (you are a hedgehog).
                    - Keep answers SHORT (max 2-3 sentences).
                    - If asked about the website, explain the tech stack.
                    - If asked about Gunasree, use the Personal Context.
                    ` }]
                    }
                })
            });

            if (!response.ok) throw new Error('API_FAIL');
            const data = await response.json();
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error.";

            document.getElementById(loadId).remove();
            msgs.innerHTML += `<div class="msg ai">${Utils.parseMarkdown(reply)}</div>`;
        } catch (e) {
            console.error(e);
            document.getElementById(loadId).remove();
            let err = e.message === 'CORS' ? "⚠️ Connect via Local Server to use AI." : getFallbackResponse(text);
            msgs.innerHTML += `<div class="msg ai">${Utils.parseMarkdown(err)}</div>`;
        }
        msgs.scrollTop = msgs.scrollHeight;
    };

    return { toggleChat, renderPrompts, sendQuickMessage, sendMessage };
})();

// --- ANIMATION MODULE ---
const AnimationModule = (() => {
    const initThreeJS = () => {
        const container = Utils.getElement(SELECTORS.canvasContainer);
        if (!container) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const geo = new THREE.IcosahedronGeometry(2, 60);
        const mat = new THREE.ShaderMaterial({
            vertexShader: `uniform float uTime; varying float vNoise; void main() { vec3 pos = position; pos += normal * sin(pos.x * 2.0 + uTime) * 0.1; gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0); vNoise = pos.z; }`,
            fragmentShader: `varying float vNoise; void main() { gl_FragColor = vec4(0.02, 0.71, 0.83, 0.3); }`,
            uniforms: { uTime: { value: 0 } }, wireframe: true, transparent: true
        });
        const sphere = new THREE.Mesh(geo, mat);
        scene.add(sphere);
        camera.position.z = 6;

        const animate = () => {
            requestAnimationFrame(animate);
            mat.uniforms.uTime.value += 0.01;
            sphere.rotation.y += 0.002;
            renderer.render(scene, camera);
        };
        animate();
        window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
    };

    const initScrollReveal = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
        }, { threshold: CONFIG.SCROLL_THRESHOLD });
        document.querySelectorAll('.reveal-section').forEach(s => observer.observe(s));
    };
    return { initThreeJS, initScrollReveal };
})();

// --- INITIALIZATION ---
window.onload = () => {
    const loading = Utils.getElement(SELECTORS.loading);
    if (loading) { loading.style.opacity = '0'; setTimeout(() => loading.remove(), 1000); }
    ThemeModule.initTheme();
    AnimationModule.initThreeJS();
    NavigationModule.initScrollBehavior();
    AnimationModule.initScrollReveal();
    Renderer.renderProjects();
    Renderer.renderSkills();
    Renderer.renderExperienceTabs();
    ExperienceModule.updateExperienceView(0);
    ChatModule.renderPrompts();
};

// Exports
window.ExperienceModule = ExperienceModule;
window.NavigationModule = NavigationModule;
window.SkillsModule = SkillsModule;
window.AIModule = AIModule;
window.ChatModule = ChatModule;
window.scrollToSection = NavigationModule.scrollToSection;
window.filterSkills = SkillsModule.filterSkills;
window.generateLiveBio = AIModule.generateLiveBio;
window.toggleChat = ChatModule.toggleChat;
window.sendMessage = ChatModule.sendMessage;
window.closeModal = AIModule.closeModal;
window.toggleTheme = ThemeModule.toggleTheme;