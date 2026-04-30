import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Cpu } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-40 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
         <div className="flex items-center gap-10 mb-24">
           <h2 className="text-5xl md:text-7xl font-black whitespace-nowrap">Education Journey</h2>
           <div className="h-[2px] w-full bg-gradient-to-r from-blue-500/50 to-transparent" />
         </div>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-1 glass-card bg-gradient-to-br from-blue-500/10 to-transparent group"
            >
              <div className="p-12 h-full rounded-[1.7rem] bg-[#020617]/40">
                <GraduationCap className="text-blue-400 w-16 h-16 mb-8 group-hover:scale-110 transition-transform" />
                <span className="text-blue-500 text-sm font-black tracking-widest mb-4 block">GRADUATED 2021</span>
                <h3 className="text-4xl font-bold mb-6">High School (10th)</h3>
                <p className="text-slate-400 mb-10 text-lg leading-relaxed">Achieved academic excellence with a focus on science and mathematics, Social Science,Sanskrit,English,Hindi.</p>
                <div className="flex items-center gap-4">
                   <div className="text-6xl font-black text-gradient">61%</div>
                   <div className="w-12 h-[2px] bg-slate-800" />
                   <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Score</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="p-1 glass-card bg-gradient-to-br from-purple-500/10 to-transparent group"
            >
              <div className="p-12 h-full rounded-[1.7rem] bg-[#020617]/40">
                <Award className="text-purple-400 w-16 h-16 mb-8 group-hover:scale-110 transition-transform" />
                <span className="text-purple-500 text-sm font-black tracking-widest mb-4 block">GRADUATED 2023</span>
                <h3 className="text-4xl font-bold mb-6">Intermediate (12th)</h3>
                <p className="text-slate-400 mb-10 text-lg leading-relaxed">Specialized in PCMEH (Physics, Chemistry, Maths,English,Hindi).</p>
                <div className="flex items-center gap-4">
                   <div className="text-6xl font-black text-gradient from-purple-400 to-pink-500">60%</div>
                   <div className="w-12 h-[2px] bg-slate-800" />
                   <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Score</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="p-1 glass-card bg-gradient-to-br from-cyan-500/10 to-transparent group"
            >
              <div className="p-12 h-full rounded-[1.7rem] bg-[#020617]/40">
                <Cpu className="text-cyan-400 w-16 h-16 mb-8 group-hover:scale-110 transition-transform" />
                <span className="text-cyan-500 text-sm font-black tracking-widest mb-4 block uppercase">Currently Pursuing</span>
                <h3 className="text-4xl font-bold mb-6">B. Tech CSE</h3>
                <p className="text-slate-400 mb-10 text-lg leading-relaxed">Focusing on Computer Science & Engineering. Mastering algorithms, full-stack development, and modern technologies.</p>
                <div className="flex items-center gap-4">
                   <div className="text-6xl font-black text-gradient from-cyan-400 to-blue-500">7.22</div>
                   <div className="w-12 h-[2px] bg-slate-800" />
                   <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">CGPA</span>
                </div>
              </div>
            </motion.div>
         </div>
      </div>
    </section>
  );
};

export default Education;
