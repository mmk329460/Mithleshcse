import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Cpu } from 'lucide-react';

const educationData = [
  {
    icon: GraduationCap,
    iconColor: "text-blue-400",
    gradient: "from-blue-500/10",
    tag: "GRADUATED 2021",
    tagColor: "text-blue-500",
    title: "High School (10th)",
    desc: "Achieved academic excellence with a focus on science and mathematics, Social Science,Sanskrit,English,Hindi.",
    score: "61%",
    scoreGradient: "",
    scoreLabel: "Score"
  },
  {
    icon: Award,
    iconColor: "text-purple-400",
    gradient: "from-purple-500/10",
    tag: "GRADUATED 2023",
    tagColor: "text-purple-500",
    title: "Intermediate (12th)",
    desc: "Specialized in PCMEH (Physics, Chemistry, Maths,English,Hindi).",
    score: "60%",
    scoreGradient: "from-purple-400 to-pink-500",
    scoreLabel: "Score"
  },
  {
    icon: Cpu,
    iconColor: "text-cyan-400",
    gradient: "from-cyan-500/10",
    tag: "Currently Pursuing",
    tagColor: "text-cyan-500",
    title: "B. Tech CSE",
    desc: "Focusing on Computer Science & Engineering. Mastering algorithms, full-stack development, and modern technologies.",
    score: "7.22",
    scoreGradient: "from-cyan-400 to-blue-500",
    scoreLabel: "CGPA"
  }
];

const Education = () => {
  return (
    <section id="education" className="py-40 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
         <div className="flex items-center gap-10 mb-24">
           <h2 className="text-5xl md:text-7xl font-black whitespace-nowrap">Education Journey</h2>
           <div className="h-[2px] w-full bg-gradient-to-r from-blue-500/50 to-transparent" />
         </div>
         
         <div className="overflow-hidden relative w-full pause-on-hover">
            {/* Fading Edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee flex gap-10 py-4">
              {[...educationData, ...educationData].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`p-1 glass-card bg-gradient-to-br ${item.gradient} to-transparent group w-[400px] min-w-[400px] shrink-0 cursor-pointer`}
                  >
                    <div className="p-12 h-full rounded-[1.7rem] bg-[#020617]/40">
                      <IconComponent className={`${item.iconColor} w-16 h-16 mb-8 group-hover:scale-110 transition-transform`} />
                      <span className={`${item.tagColor} text-sm font-black tracking-widest mb-4 block uppercase`}>{item.tag}</span>
                      <h3 className="text-4xl font-bold mb-6">{item.title}</h3>
                      <p className="text-slate-400 mb-10 text-lg leading-relaxed">{item.desc}</p>
                      <div className="flex items-center gap-4">
                        <div className={`text-6xl font-black text-gradient ${item.scoreGradient}`}>{item.score}</div>
                        <div className="w-12 h-[2px] bg-slate-800" />
                        <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">{item.scoreLabel}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
         </div>
      </div>
    </section>
  );
};

export default Education;
