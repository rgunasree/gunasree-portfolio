import { motion } from 'framer-motion';
import { Brain, Code2, Lightbulb, TrendingUp } from 'lucide-react';

const highlights = [
  {
    icon: Brain,
    title: 'AI/ML Expertise',
    description: 'Deep learning, NLP, and predictive modeling',
  },
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'End-to-end product development with modern frameworks',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solver',
    description: 'Creative solutions for complex technical challenges',
  },
  {
    icon: TrendingUp,
    title: 'Impact-Driven',
    description: 'Focus on measurable results and business value',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 relative">
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
              About Me
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a driven AI/ML enthusiast with a <span className="text-cyan-400 font-semibold">CGPA of 8.1</span>, passionate about transforming data into actionable insights and building intelligent systems that create measurable impact. My journey in artificial intelligence is fueled by curiosity and a commitment to continuous learning.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I specialize in developing <span className="text-cyan-400 font-semibold">production-ready AI solutions</span> that solve real-world problems. From bias detection platforms achieving <span className="text-cyan-400 font-semibold">43% diversity improvements</span> to real-time recommendation systems with <span className="text-cyan-400 font-semibold">sub-500ms response times</span>, I focus on creating systems that deliver tangible business value.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My technical toolkit spans modern frameworks like <span className="text-cyan-400 font-semibold">Python, TensorFlow, PyTorch, Next.js, and TypeScript</span>. I excel at bridging the gap between cutting-edge AI research and practical, scalable applications. Whether it's fine-tuning LLMs, optimizing NLP pipelines, or building intuitive data dashboards, I bring both technical depth and product thinking to every project.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I thrive in fast-paced environments where innovation meets impact. As a quick learner and collaborative team player, I'm eager to contribute to organizations pushing the boundaries of what's possible with AI and data science.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 hover:border-cyan-400/50 transition-all"
              >
                <item.icon className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl p-8 border border-blue-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            What Drives Me
          </h3>
          <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            I believe AI should augment human capabilities and drive positive change. Every line of code I write, every model I train, and every insight I uncover is aimed at creating systems that are not just technically excellent, but also ethical, accessible, and transformative for the people who use them.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
