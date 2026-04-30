import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock, Lock, Key, Upload, Award, FileText, FolderOpen, ChevronUp, ChevronDown, Cloud, Save, Download, Trash2 } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const Docs = () => {
  const [isDocsExpanded, setIsDocsExpanded] = useState(false);
  const [isCertsExpanded, setIsCertsExpanded] = useState(false);
  const { 
    isUnlocked, setShowPinModal, userPin, handleFileUpload, 
    documents, handleDelete, certificates, setIsUnlocked 
  } = useContext(AppContext);

  return (
    <section id="docs" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
           variants={sectionVariants} initial="hidden" animate="visible"
           className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">Credentials Center</h2>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className={`px-4 py-2 rounded-full glass-card flex items-center gap-3 ${isUnlocked ? 'text-green-400 border-green-500/10' : 'text-red-400/80 border-red-500/10'}`}>
                {isUnlocked ? <Unlock size={14} /> : <Lock size={14} />}
                <span className="text-[10px] font-black uppercase tracking-widest">{isUnlocked ? 'Vault Unlocked' : 'Vault Locked'}</span>
              </div>
              <button 
                onClick={() => setShowPinModal(true)}
                className="p-2 glass-card hover:bg-white/5 transition-all text-blue-400"
                title={userPin ? "Change/Unlock PIN" : "Set Security PIN"}
              >
                <Key size={18} />
              </button>
              {isUnlocked && (
                <button onClick={() => setIsUnlocked(false)} className="text-xs text-slate-500 hover:text-white underline">Lock Now</button>
              )}
            </div>
            <p className="text-slate-400 text-xl font-light leading-relaxed">Securely store and share your academic and professional achievements with the world.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="btn-primary flex items-center gap-3 cursor-pointer group shadow-blue-500/20">
              <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> 
              <span className="relative z-10">Add Document</span>
              <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'doc')} />
            </label>
            <label className="btn-primary from-purple-600 to-pink-600 flex items-center gap-3 cursor-pointer group shadow-purple-500/20">
              <Award className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> 
              <span className="relative z-10">Add Certificate</span>
              <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'cert')} />
            </label>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Docs Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-4 text-blue-400 uppercase tracking-widest">
              <FileText className="w-8 h-8" /> Records
            </h3>
            
            <button 
              onClick={() => setIsDocsExpanded(!isDocsExpanded)}
              className="w-full glass-card p-6 flex items-center justify-between group hover:border-blue-500/50 transition-all text-left"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <FolderOpen className="text-blue-400 w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-xl mb-1">Documents Vault</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{documents.length} Files Stored</p>
                </div>
              </div>
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-blue-500 group-hover:text-white transition-all">
                {isDocsExpanded ? <ChevronUp /> : <ChevronDown />}
              </div>
            </button>

            <div className="grid gap-4 overflow-hidden">
              <AnimatePresence>
                {isDocsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4"
                  >
                    {documents.length === 0 && (
                      <div className="p-8 glass-card border-dashed border-2 border-white/5 text-center text-slate-600 italic">
                        No documents uploaded.
                      </div>
                    )}
                    {documents.map((doc) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        key={doc.id} 
                        className="glass-card p-6 flex items-center justify-between group hover:border-blue-500/50 bg-white/[0.02]"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-blue-500/5 rounded-xl flex items-center justify-center group-hover:bg-blue-500/10 transition-all">
                            <FileText className="text-blue-400 w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold">{doc.name}</p>
                              {doc.firestoreId ? (
                                <Cloud className="w-3 h-3 text-blue-400" title="Synced to Cloud" />
                              ) : (
                                <Save className="w-3 h-3 text-slate-500 animate-pulse" title="Syncing..." />
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{doc.size} • {doc.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {isUnlocked ? (
                            <>
                              <a href={doc.url} download={doc.name} className="p-3 glass-card hover:bg-blue-500 hover:text-white transition-all text-slate-400">
                                <Download size={18} />
                              </a>
                              <button 
                                onClick={() => handleDelete(doc, 'doc')}
                                className="p-3 glass-card hover:bg-red-500/20 hover:text-red-500 transition-all text-slate-400"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          ) : (
                            <button onClick={() => setShowPinModal(true)} className="p-3 glass-card text-slate-600 hover:text-blue-400 transition-all flex items-center gap-2">
                              <Lock size={14} /> <span className="text-[10px] font-bold">Locked</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Certs Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-4 text-purple-400 uppercase tracking-widest">
              <Award className="w-8 h-8" /> Badges
            </h3>

             <button 
              onClick={() => setIsCertsExpanded(!isCertsExpanded)}
              className="w-full glass-card p-6 flex items-center justify-between group hover:border-purple-500/50 transition-all text-left"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                  <Award className="text-purple-400 w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-xl mb-1">Certificates Vault</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{certificates.length} Badges Stored</p>
                </div>
              </div>
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-purple-500 group-hover:text-white transition-all">
                {isCertsExpanded ? <ChevronUp /> : <ChevronDown />}
              </div>
            </button>

            <div className="grid gap-4 overflow-hidden">
              <AnimatePresence>
                {isCertsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4"
                  >
                    {certificates.length === 0 && (
                      <div className="p-8 glass-card border-dashed border-2 border-white/5 text-center text-slate-600 italic">
                        No certificates uploaded.
                      </div>
                    )}
                    {certificates.map((cert) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        key={cert.id} 
                        className="glass-card p-6 flex items-center justify-between group hover:border-purple-500/50 bg-white/[0.02]"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-purple-500/5 rounded-xl flex items-center justify-center group-hover:bg-purple-500/10 transition-all">
                            <Award className="text-purple-400 w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold">{cert.name}</p>
                              {cert.firestoreId ? (
                                <Cloud className="w-3 h-3 text-purple-400" title="Synced to Cloud" />
                              ) : (
                                <Save className="w-3 h-3 text-slate-500 animate-pulse" title="Syncing..." />
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{cert.size} • {cert.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {isUnlocked ? (
                            <>
                              <a href={cert.url} download={cert.name} className="p-3 glass-card hover:bg-purple-500 hover:text-white transition-all text-slate-400">
                                <Download size={18} />
                              </a>
                              <button 
                                onClick={() => handleDelete(cert, 'cert')}
                                className="p-3 glass-card hover:bg-red-500/20 hover:text-red-500 transition-all text-slate-400"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          ) : (
                            <button onClick={() => setShowPinModal(true)} className="p-3 glass-card text-slate-600 hover:text-purple-400 transition-all flex items-center gap-2">
                              <Lock size={14} /> <span className="text-[10px] font-bold">Locked</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Docs;
