import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronRight, Coffee, Cpu, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <section id="home" className="min-h-screen flex items-center px-6 pt-20">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Namaste / Welcome to my space
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.85] tracking-tighter">
            Hello,I am <br />
            <span className="text-gradient">Mithlesh Kumar</span> <br />
            <div className="text-4xl md:text-6xl lg:text-7xl text-slate-500 mt-8 opacity-80 tracking-[0.2em] font-light uppercase">
              Creative Developer
            </div>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl lg:text-2xl mb-12 max-w-xl leading-relaxed font-light">
            Crafting digital experiences that merge <span className="text-white font-medium">unparalleled design</span> with cutting-edge <span className="text-white font-medium">engineering</span>.
          </p>

          <div className="flex flex-wrap gap-6">
            <button onClick={() => navigate("/projects")} className="btn-primary scale-110">Start a Project</button>
            <button onClick={() => navigate("/skills")} className="px-10 py-5 rounded-2xl glass-card font-bold hover:bg-white/5 transition-all flex items-center gap-2 border-white/5">
              My Work <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex gap-8 mt-16">
            {[
              { Icon: Github, href: "https://github.com/" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/mithlesh-kumar-12ab51318/" },
              { Icon: Mail, href: "mailto:mithleshkumar329460@gmail.com" }
            ].map(({ Icon, href }, i) => (
              <motion.a 
                key={i} 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-4 glass-card rounded-2xl text-slate-400 hover:text-blue-400 hover:border-blue-400/30 group transition-all"
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
          className="relative aspect-square max-w-md mx-auto lg:max-w-none group"
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-[3rem] blur-3xl animate-pulse" />
          <div className="relative w-full h-full rounded-[3rem] overflow-hidden glass-card p-2 animate-float">
            <AnimatePresence mode="wait">
              <motion.img 
                key={isImageHovered ? 'hover' : 'main'}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                src={isImageHovered ? "/profile-2.jpg" : "/profile-1.jpg"} 
                alt="Mithlesh Kumar"
                className="w-full h-full object-cover rounded-[2.5rem] brightness-90 group-hover:brightness-110 transition-all duration-700"
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-blue-400 font-bold uppercase tracking-widest">Based in</p>
                  <h4 className="text-xl font-bold">Bharat, Earth</h4>
                </div>
                <Coffee className="w-8 h-8 text-white/50" />
              </div>
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-10 p-6 glass-card rounded-3xl hidden lg:block"
          >
            <Cpu className="text-blue-400 w-10 h-10" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-10 -left-10 p-6 glass-card rounded-3xl hidden lg:block"
          >
             <Globe className="text-purple-400 w-10 h-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
