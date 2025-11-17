import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'TensorFlow', level: 90 },
      { name: 'PyTorch', level: 88 },
      { name: 'Scikit-learn', level: 92 },
      { name: 'NLP/LLMs', level: 90 },
      { name: 'Computer Vision', level: 85 },
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'Next.js', level: 92 },
      { name: 'React', level: 93 },
      { name: 'TypeScript', level: 90 },
      { name: 'Node.js', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'FastAPI', level: 87 },
    ],
    color: 'from-cyan-500 to-teal-500',
  },
  {
    title: 'Data & Analytics',
    skills: [
      { name: 'Pandas', level: 93 },
      { name: 'NumPy', level: 92 },
      { name: 'SQL', level: 90 },
      { name: 'Data Visualization', level: 88 },
      { name: 'Statistical Analysis', level: 87 },
      { name: 'ETL Pipelines', level: 85 },
    ],
    color: 'from-teal-500 to-emerald-500',
  },
  {
    title: 'Tools & Technologies',
    skills: [
      { name: 'Git/GitHub', level: 92 },
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'MongoDB', level: 87 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'RESTful APIs', level: 90 },
    ],
    color: 'from-emerald-500 to-green-500',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
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
              Skills & Expertise
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 hover:border-cyan-400/50 transition-all"
            >
              <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-lg">
            Constantly learning and adapting to emerging technologies in AI and web development
          </p>
        </motion.div>
      </div>
    </section>
  );
}
