import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import UploadProgress from './UploadProgress';
import PinModal from './PinModal';

const Layout = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-blue-500 pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: 'spring', damping: 15, stiffness: 350, mass: 0.2 }}
      />

      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-bg w-[500px] h-[500px] bg-blue-600/10 top-[-20%] left-[-10%]" />
        <div className="glow-bg w-[600px] h-[600px] bg-purple-600/10 bottom-[-20%] right-[-10%]" />
        <div className="glow-bg w-[400px] h-[400px] bg-indigo-600/10 top-[40%] right-[20%]" />
        <div className="absolute inset-0 mesh-gradient opacity-40" />
      </div>

      <Navbar />
      <UploadProgress />

      <main className="relative z-10">
        <Outlet />
      </main>

      <PinModal />
      <Footer />
    </div>
  );
};

export default Layout;
