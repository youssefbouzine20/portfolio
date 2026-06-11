'use client';
import { motion } from 'framer-motion';

const skills = [
  { category: 'Data Science & ML', items: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Predictive Modeling', 'CRISP-DM'] },
  { category: 'Data Engineering', items: ['ETL Pipelines', 'REST APIs', 'Web Scraping', 'BeautifulSoup', 'n8n', 'Automation'] },
  { category: 'Databases', items: ['SQL', 'MySQL', 'PostgreSQL', 'SQLite'] },
  { category: 'DevOps & Tools', items: ['Docker', 'Linux', 'Bash', 'Git', 'GitHub', 'Jupyter', 'VS Code'] },
  { category: 'Visualization & BI', items: ['Power BI', 'Matplotlib', 'Seaborn'] },
  { category: 'Languages', items: ['Arabic (Native)', 'French (Fluent)', 'English (Fluent)', 'Spanish (Intermediate)'] },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { y: 12, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 120, damping: 14 } },
};

export default function Skills() {
  return (
    <section id="skills" className="w-full min-h-[80vh] py-28 px-6 relative flex items-center">
      <div className="container mx-auto max-w-6xl">

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16">
          <span className="text-white/25 font-semibold uppercase tracking-widest text-xs mb-4">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-black text-white/90 mb-3 text-center">Technical Arsenal</h2>
          <p className="text-white/40 text-center max-w-xl font-light">
            A focused toolkit across the full data lifecycle — from raw ingestion to intelligent automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group) => (
            <motion.div key={group.category} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-40px' }} variants={containerVariants}
              className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-6
                hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 flex flex-col">
              <h3 className="text-xs font-bold text-white/60 mb-5 flex items-center gap-3 uppercase tracking-wider">
                <span className="w-5 h-[1px] bg-white/30 rounded-full" />
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {group.items.map((item, i) => (
                  <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.04, y: -1 }}
                    className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5
                      hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200">
                    <span className="font-medium text-white/60 text-xs">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
