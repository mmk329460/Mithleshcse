import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-40 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-6">My Skills</h2>
          <p className="text-slate-400 text-xl font-light">Tools I use to bring ideas into reality.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Java', icon: '☕', desc: 'Enterprise Logic' },
            { name: 'DSA', icon: '📊', desc: 'Efficiency & Speed' },
            { name: 'HTML5', icon: '🌐', desc: 'Core Structure' },
            { name: 'CSS3', icon: '🎨', desc: 'Visual Artistry' },
            { name: 'JavaScript', icon: '⚡', desc: 'Dynamic Magic' },
            { name: 'React', icon: '⚛️', desc: 'Modern UI' },
            { name: 'Tailwind', icon: '🌊', desc: 'Styling Velocity' },
            { name: 'Git', icon: '🌳', desc: 'Version Control' },
          ].map((skill, index) => (
            <motion.div
              key={index}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-10 flex flex-col justify-between h-[280px] group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all" />
              <span className="text-6xl mb-6 transform group-hover:scale-110 transition-all origin-left">{skill.icon}</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">{skill.name}</h3>
                <p className="text-slate-500 text-sm font-medium">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
