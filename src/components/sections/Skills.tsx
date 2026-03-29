'use client';
import { motion } from 'framer-motion';

const skills = [
  {
    category: "Big Data & Engineering",
    items: ["Apache Spark", "Apache Kafka", "Airflow", "Hadoop", "ETL", "Data Cleaning"]
  },
  {
    category: "Databases (SQL/NoSQL)",
    items: ["MySQL", "PostgreSQL", "MongoDB", "NoSQL"]
  },
  {
    category: "Programming & Back-end",
    items: ["Python", "Django", "Node.js", "React", "REST APIs", "C"]
  },
  {
    category: "Machine Learning & NLP",
    items: ["Supervised ML", "KNN", "NLP", "Classification", "Data Mining"]
  },
  {
    category: "Data Visualization & BI",
    items: ["Power BI", "Excel", "Matplotlib", "Seaborn"]
  },
  {
    category: "Tools & Cloud",
    items: ["Git", "Docker", "VS Code", "Jupyter", "Cloud Basics"]
  }
];

// Re-using the same animation configurations from earlier
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function Skills() {
  return (
    <section id="skills" className="w-full min-h-[80vh] bg-background py-24 px-6 relative flex items-center">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical <span className="text-mint">Arsenal</span></h2>
          <p className="text-gray-400 text-center max-w-2xl">A comprehensive toolkit spanning across data engineering, full-stack development, and infrastructure.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, idx) => (
            <motion.div 
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="bg-surface/50 border border-white/5 rounded-3xl p-6 shadow-xl backdrop-blur-sm flex flex-col"
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-6 h-1 bg-mint rounded-full"></span>
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap gap-3 mt-auto">
                {skillGroup.items.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 5px 15px rgba(0, 255, 163, 0.2)" }}
                    className="bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 flex items-center justify-center text-center cursor-none transition-colors hover:border-mint/50"
                  >
                    <span className="font-medium text-gray-300 hover:text-white transition-colors text-xs">{item}</span>
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
