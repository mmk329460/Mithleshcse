import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const UploadProgress = () => {
  const { uploadProgress } = useContext(AppContext);

  return (
    <AnimatePresence>
      {uploadProgress && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <div className="glass-card p-12 max-w-md w-full text-center border-t-4 border-blue-500">
            <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-8" />
            <h3 className="text-2xl font-black mb-4 animate-pulse uppercase tracking-tighter italic text-blue-400">Processing...</h3>
            <p className="text-white text-lg font-medium mb-6">{uploadProgress}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadProgress;
