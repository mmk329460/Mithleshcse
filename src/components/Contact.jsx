import React from 'react';
import { Mail, Smartphone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 lg:py-40 px-4 md:px-6">
      <div className="max-w-5xl mx-auto glass-card p-1 relative overflow-hidden bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-[2rem] lg:rounded-[3.5rem]">
         <div className="p-8 lg:p-16 rounded-[1.8rem] lg:rounded-[2.8rem] bg-[#020617]/80 backdrop-blur-xl">
           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
             <div>
               <h2 className="text-3xl lg:text-5xl font-black mb-6 lg:mb-8 leading-tight">Ready to <br /><span className="text-gradient">levitate</span> your <br />brand?</h2>
               <p className="text-slate-400 text-base lg:text-lg mb-8 lg:mb-12 font-light">Let's build something that survives the future. Get in touch for collaborations or just a coffee chat.</p>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer overflow-hidden">
                     <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 glass-card flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                       <Mail size={18} />
                     </div>
                     <span className="text-sm lg:text-lg font-medium truncate">mithleshkumar329460@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                     <div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 glass-card flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                        <Smartphone size={18} />
                     </div>
                     <span className="text-sm lg:text-lg font-medium">+91 9234411589</span>
                  </div>
               </div>
             </div>

             <form className="space-y-4 lg:space-y-6">
               <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                 <div className="space-y-2 lg:space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Name</label>
                   <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl px-5 py-3 lg:px-6 lg:py-4 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all text-sm" placeholder="Your Name" />
                 </div>
                 <div className="space-y-2 lg:space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email</label>
                   <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl px-5 py-3 lg:px-6 lg:py-4 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all text-sm" placeholder="Your Email" />
                 </div>
               </div>
               <div className="space-y-2 lg:space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Message</label>
                 <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl px-5 py-3 lg:px-6 lg:py-4 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all text-sm resize-none" placeholder="How can I help you?"></textarea>
               </div>
               <button type="submit" className="btn-primary w-full py-4 lg:py-5 shadow-2xl">Send Message</button>
             </form>
           </div>
         </div>
      </div>
    </section>
  );
};

export default Contact;
