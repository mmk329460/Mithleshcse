import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const PinModal = () => {
  const { 
    showPinModal, setShowPinModal, userPin, 
    pinInput, setPinInput, handleVerifyPin, handleSetPin 
  } = useContext(AppContext);

  return (
    <AnimatePresence>
      {showPinModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setShowPinModal(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md glass-card p-10 bg-[#020617]/90 border-blue-500/30"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <Key className="text-blue-500" /> 
                <h3 className="text-2xl font-black italic">{userPin ? 'Unlock Vault' : 'Set Security PIN'}</h3>
              </div>
              <button onClick={() => setShowPinModal(false)}><X /></button>
            </div>
            
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              {userPin 
                ? "Enter the global master PIN to enable downloads and deletions." 
                : "Create a 4-digit master PIN to protect your personal files. This will be shared across all devices."}
            </p>

            <div className="space-y-6">
              <input 
                type="password" 
                maxLength="4"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="• • • •"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-4xl text-center font-black tracking-[1em] focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all"
              />
              <button 
                onClick={userPin ? handleVerifyPin : handleSetPin}
                className="btn-primary w-full py-5 text-lg"
              >
                {userPin ? 'Verify & Unlock' : 'Set Master PIN'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PinModal;
