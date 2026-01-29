import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, TrendingUp, Zap, Target } from 'lucide-react';
import { useRef } from 'react';
import ProjectImpactChart from './ProjectImpactChart';

const projects = [
  {
    title: 'FairAssess.ai',
    tagline: 'AI-Powered Hiring Bias Detection Platform',
    description: 'Enterprise-grade platform that analyzes job descriptions and candidate evaluations for bias, providing real-time fairness analytics and AI-powered rewriting suggestions.',
    achievements: [
      '43% boost in candidate diversity through bias detection',
      'Sub-500ms analysis with LLM-powered insights',
      'Real-time fairness dashboard with actionable metrics',
      'Automated bias rewriting with context preservation',
      'Multi-dimensional bias scoring across gender, race, age',
    ],
    tech: ['Next.js', 'TypeScript', 'Python', 'OpenAI GPT', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://fairassess-j0isbrlkp-gunasrees-projects.vercel.app',
    githubUrl: 'https://github.com/rgunasree/FairAssess',
    gradient: 'from-blue-500 to-cyan-500',
    impactMetric: { value: 43, label: 'Diversity Boost' },
    image: '/images/fair_assess_smurf.png'
  },
  {
    title: 'WhatShouldIWatch.ai',
    tagline: 'Mood-Based Entertainment Recommender',
    description: 'Real-time AI recommendation engine that suggests movies and shows based on user mood, preferences, and viewing history with instant results.',
    achievements: [
      'Real-time AI recommendations with instant results',
      'No signup required - frictionless user experience',
      'Mobile-first responsive design for all devices',
      'TMDB API integration with 1M+ titles',
      'Personalized mood-to-content matching algorithm',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'OpenAI API', 'TMDB API', 'Vercel'],
    liveUrl: 'https://whatshouldiwatch-ai.vercel.app',
    githubUrl: 'https://github.com/rgunasree/whatshouldiwatch-ai',
    gradient: 'from-cyan-500 to-teal-500',
    impactMetric: { value: 500, label: 'ms Response Time', prefix: '<' },
    image: '/images/what_should_i_watch_smurf.png'
  },
  {
    title: 'AI-Powered Resume Matcher',
    tagline: 'Intelligent Resume Ranking Engine',
    description: 'Hybrid NLP system combining BM25 and FAISS for semantic resume-job matching, with recruiter dashboard for efficient candidate screening.',
    achievements: [
      'Hybrid search with BM25 + FAISS vector similarity',
      'Automated skill extraction and matching',
      'Batch resume upload with parallel processing',
      'Real-time ranking dashboard for recruiters',
      'Semantic filtering with 95%+ accuracy',
    ],
    tech: ['Python', 'FastAPI', 'FAISS', 'Transformers', 'React', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/rgunasree/resume-matcher',
    gradient: 'from-teal-500 to-emerald-500',
    impactMetric: { value: 95, label: 'Match Accuracy' },
    image: '/images/resume_matcher_smurf.png'
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000"
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "translateZ(-50px)" }}
      />

      <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden hover:border-cyan-400/50 transition-colors duration-500 shadow-2xl">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-8 lg:p-12 flex flex-col justify-center space-y-8" style={{ transform: "translateZ(20px)" }}>
            <div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-block"
              >
                <h3 className={`text-4xl font-bold mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  {project.title}
                </h3>
              </motion.div>
              <p className="text-cyan-400 text-xl font-medium mb-6">
                {project.tagline}
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold uppercase tracking-wider text-sm">
                <Target className="w-4 h-4" />
                <span>Key Achievements</span>
              </div>
              <div className="grid gap-3">
                {project.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Zap className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className={`px-4 py-1.5 bg-white/5 rounded-full text-sm text-cyan-300 border border-white/10 hover:bg-white/10 transition-colors`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, translateZ: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${project.gradient} rounded-full text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all`}
                >
                  <ExternalLink size={20} />
                  Live Demo
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, translateZ: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-white/10 transition-all"
                >
                  <Github size={20} />
                  View Code
                </motion.a>
              )}
            </div>
          </div>

          <div className="relative min-h-[400px] lg:min-h-full bg-gradient-to-br from-slate-800 to-slate-900 p-8 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            {/* Project Image Background with Parallax-like feel */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                scale: 1.1,
                translateX: useTransform(mouseX, [-0.5, 0.5], ["-5%", "5%"]),
                translateY: useTransform(mouseY, [-0.5, 0.5], ["-5%", "5%"]),
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full max-w-md"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className={`bg-gradient-to-br ${project.gradient} bg-opacity-10 rounded-3xl p-8 border border-white/10 backdrop-blur-md shadow-2xl`}>
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-white mx-auto mb-6 drop-shadow-lg" />
                  <div className="text-6xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
                    {project.impactMetric.prefix}{project.impactMetric.value}
                    {!project.impactMetric.prefix && '%'}
                  </div>
                  <div className="text-xl text-white/90 font-bold uppercase tracking-widest">
                    {project.impactMetric.label}
                  </div>
                </div>
                <div className="mt-8">
                  <ProjectImpactChart value={project.impactMetric.value} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-lg">
            Real-world AI solutions delivering measurable impact
          </p>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-lg mb-6">
            More projects and open-source contributions on GitHub
          </p>
          <motion.a
            href="https://github.com/rgunasree"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-shadow"
          >
            <Github size={20} />
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
