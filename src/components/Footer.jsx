import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 px-6 bg-[#010413]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
         <div>
           <div className="text-3xl font-black text-gradient mb-4">PORTFOLIO</div>
           <p className="text-slate-500 text-sm max-w-xs leading-relaxed">Designing tomorrow's web today. Handcrafted with passion, coffee, and pure code.</p>
         </div>
         
          <div className="flex flex-wrap justify-center gap-12">
            <div className="space-y-6">
              <h6 className="text-xs font-black tracking-[0.3em] text-white/40 uppercase">EXPLORE</h6>
              <ul className="space-y-3">
                <li><Link to="/projects" className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium">Work</Link></li>
                <li><Link to="/about" className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium">About</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium">Contact</Link></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h6 className="text-xs font-black tracking-[0.3em] text-white/40 uppercase">SOCIAL</h6>
              <ul className="space-y-3">
                <li><a href="https://www.linkedin.com/in/mithlesh-kumar-12ab51318/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium">LinkedIn</a></li>
                <li><a href="https://github.com/mithleshkumar329460-hub" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium">GitHub</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium">Twitter</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium">Behance</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h6 className="text-xs font-black tracking-[0.3em] text-white/40 uppercase">LEGAL</h6>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium">Cookies</a></li>
              </ul>
            </div>
          </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
         <p className="text-slate-600 text-xs">© 2026 MITHLESH KUMAR. All rights reserved.</p>
         <div className="flex items-center gap-2 text-slate-600 text-xs">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
           System Status: Optimized
         </div>
      </div>
    </footer>
  );
};

export default Footer;
