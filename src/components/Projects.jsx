import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projects" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h6 className="text-blue-400 font-bold tracking-[0.3em] uppercase mb-6">Projects</h6>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Personal & <br /><span className="text-gradient">Academic Works</span></h2>
            <p className="text-slate-400 text-xl font-light">A curated selection of projects that define my technical evolution.</p>
          </div>
          <a 
            href="https://github.com/mithleshkumar329460-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 rounded-2xl glass-card font-bold hover:bg-blue-500 hover:text-white transition-all bg-white/5 border-white/5"
          >
            Explore All Github
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {[
            { 
              title: "Smart Portfolio", 
              type: "Web Innovation", 
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426",
              tech: ["React", "Framer Motion", "Tailwind"],
              github: "https://github.com/mithleshkumar329460-hub/K73",
              demo: "#"
            },
            { 
              title: "Crypto Dashboard", 
              type: "FinTech App", 
              image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232",
              tech: ["Java", "Spring Boot", "MySQL"],
              github: "https://github.com/mithleshkumar329460-hub/K73",
              demo: "#"
            }
          ].map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-[600px] rounded-[3rem] overflow-hidden glass-card"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 brightness-50 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-all" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-4 block">{project.type}</span>
                  <h3 className="text-4xl md:text-5xl font-black mb-6">{project.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-8 opacity-0 group-hover:opacity-100 transition-all delay-100">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase border border-white/10">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <motion.a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }} 
                      className="w-14 h-14 glass-card flex items-center justify-center rounded-2xl bg-white/5 hover:bg-blue-500 hover:text-white transition-all"
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: -5 }} 
                      className="w-14 h-14 glass-card flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white hover:text-black transition-all"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
