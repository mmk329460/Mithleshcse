import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, Upload, Menu, X, Layout, User, Code2, GraduationCap, FolderOpen, FileText, Mail } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resume, dbStatus, handleFileUpload } = useContext(AppContext);
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: <Layout className="w-5 h-5" /> },
    { path: '/about', label: 'About', icon: <User className="w-5 h-5" /> },
    { path: '/skills', label: 'Skills', icon: <Code2 className="w-5 h-5" /> },
    { path: '/education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
    { path: '/projects', label: 'Projects', icon: <FolderOpen className="w-5 h-5" /> },
    { path: '/docs', label: 'Documents', icon: <FileText className="w-5 h-5" /> },
    { path: '/contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-[90] bg-[#020617]/50 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="text-blue-400 w-8 h-8" />
            <span className="tracking-tighter">PORTFOLIO</span>
            <div className="flex items-center gap-1 ml-4 py-1 px-3 rounded-full bg-white/5 border border-white/10">
              <div className={`w-2 h-2 rounded-full ${
                dbStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
                dbStatus === 'checking' ? 'bg-yellow-500 animate-pulse' : 
                dbStatus === 'local' ? 'bg-blue-500' : 'bg-red-500'
              }`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {dbStatus}
              </span>
            </div>
          </motion.div>
        </Link>

        <div className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link text-sm ${currentPath === item.path ? 'text-blue-400 after:w-full' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a 
              href={resume ? resume.url : '#'} 
              download={resume ? resume.name : 'resume.pdf'}
              className={`btn-primary group ${!resume ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-4 h-4" /> {resume ? 'Download Resume' : 'No Resume'}
              </span>
            </a>
            <label className="p-4 glass-card hover:bg-white/5 cursor-pointer text-blue-400 group transition-all" title="Upload Resume">
              <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'resume')} />
            </label>
          </div>
        </motion.div>

        <button className="md:hidden text-white p-2 glass-card rounded-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="absolute top-0 right-0 h-screen w-3/4 bg-[#020617]/95 backdrop-blur-3xl border-l border-white/10 md:hidden p-10 flex flex-col gap-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-bold text-gradient">Menu</span>
                <X className="cursor-pointer" onClick={() => setIsMenuOpen(false)} />
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-6 text-2xl font-medium text-slate-400 hover:text-white transition-all transform hover:translate-x-4"
                >
                  <span className="p-3 glass-card text-blue-400">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              
              <div className="mt-auto pt-10 border-t border-white/5 space-y-4">
                <a 
                  href={resume ? resume.url : '#'} 
                  download={resume ? resume.name : 'resume.pdf'}
                  className={`btn-primary w-full flex justify-center items-center gap-3 ${!resume ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <Download className="w-5 h-5" /> {resume ? 'Download Resume' : 'Set Resume First'}
                </a>
                <label className="btn-primary from-blue-600 to-indigo-600 w-full flex justify-center items-center gap-3 cursor-pointer">
                  <Upload className="w-5 h-5" /> Upload Resume
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'resume')} />
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
