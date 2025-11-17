import { motion } from 'framer-motion';
import { ExternalLink, Github, TrendingUp, Zap, Target } from 'lucide-react';
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
    gradient: 'from-blue-500 to-cyan-500',
    impactMetric: { value: 43, label: 'Diversity Boost' },
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
    gradient: 'from-cyan-500 to-teal-500',
    impactMetric: { value: 500, label: 'ms Response Time', prefix: '<' },
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
    githubUrl: 'https://github.com/rgunasree',
    gradient: 'from-teal-500 to-emerald-500',
    impactMetric: { value: 95, label: 'Match Accuracy' },
  },
];

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

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl border border-blue-500/20 hover:border-cyan-400/50 transition-all overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  <div className="space-y-6">
                    <div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="inline-block"
                      >
                        <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                          {project.title}
                        </h3>
                      </motion.div>
                      <p className="text-cyan-400 text-lg font-medium mb-4">
                        {project.tagline}
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                        <Target className="w-5 h-5" />
                        <span>Key Achievements</span>
                      </div>
                      {project.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.1, rotate: 2 }}
                          className={`px-3 py-1 bg-gradient-to-r ${project.gradient} bg-opacity-10 rounded-full text-sm text-cyan-400 border border-cyan-400/30`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-shadow`}
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-cyan-400 rounded-full text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-colors"
                        >
                          <Github size={18} />
                          View Code
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="w-full"
                    >
                      <div className={`bg-gradient-to-br ${project.gradient} bg-opacity-10 rounded-2xl p-8 border border-cyan-400/30`}>
                        <div className="text-center mb-6">
                          <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                          <div className="text-5xl font-bold text-white mb-2">
                            {project.impactMetric.prefix}{project.impactMetric.value}
                            {!project.impactMetric.prefix && '%'}
                          </div>
                          <div className="text-cyan-400 font-semibold">
                            {project.impactMetric.label}
                          </div>
                        </div>
                        <ProjectImpactChart value={project.impactMetric.value} />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
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
