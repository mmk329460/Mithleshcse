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

const About = () => {
  return (
    <section id="about" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" viewport={{ once: true }}>
            <h6 className="text-blue-400 font-bold tracking-[0.3em] uppercase mb-6">Expertise</h6>
            <h2 className="text-5xl md:text-7xl font-black mb-12">I design and build <br /><span className="text-gradient">digital magic.</span></h2>
            <div className="space-y-8 text-slate-400 text-lg leading-relaxed">
              <p>
                With a deep obsession for detail, I engineer fluid animations and robust backends that don't just work—they feel alive. My philosophy is simple: software should be invisible but impactful.
              </p>
              <p>
                I specialize in full-stack architecture with a focus on React, Java, and performance optimization.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 mt-16">
              {[
                { val: "B. Tech", label: "Current Focus" },
                { val: "10+", label: "Projects" },
                { val: "7.22", label: "Current CGPA" },
                { val: "100%", label: "Dedication" }
              ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <h4 className="text-5xl font-black text-white group-hover:text-blue-400 transition-all mb-2">{stat.val}</h4>
                  <p className="text-sm text-slate-500 uppercase font-black tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="order-1 lg:order-2">
            <div className="relative group">
               <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-700" />
               <div className="relative glass-card p-3 rounded-[3rem] overflow-hidden">
                  <img 
                    src="/profile-1.jpg" 
                    alt="Mithlesh Kumar" 
                    className="w-full aspect-[4/5] object-cover rounded-[2.5rem]"
                  />
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
               <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
