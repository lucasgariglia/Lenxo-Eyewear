import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string | null;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => {
  return (
    <AnimatePresence>
      {isOpen && videoSrc && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            {/* Close Trigger */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-20 text-white/50 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                 <span className="text-xs font-bold uppercase tracking-widest">Close Film</span>
                 <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                   <X size={24} />
                 </div>
              </div>
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-full max-w-[90vw] aspect-video bg-black relative overflow-hidden rounded-sm shadow-2xl"
            >
               <video 
                 className="w-full h-full object-cover"
                 autoPlay 
                 controls 
                 playsInline
                 src={videoSrc}
               >
                 Your browser does not support the video tag.
               </video>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};