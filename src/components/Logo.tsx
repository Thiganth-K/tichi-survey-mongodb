import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`relative flex items-center ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <svg width="80" height="80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="40" r="25" fill="#9E2B90" />
        <circle cx="60" cy="80" r="25" fill="#9E2B90" />
        <circle cx="140" cy="80" r="25" fill="#ED0B7C" />
        <circle cx="75" cy="140" r="25" fill="#9E2B90" />
        <circle cx="125" cy="140" r="25" fill="#9E2B90" />
        <path d="M85 80 L115 80 Q120 75 115 65 L85 65 Q80 75 85 80 Z" fill="#FBAF1A" />
      </svg>
      <motion.h1 
        className="text-4xl font-bold ml-2 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Tichi
      </motion.h1>
    </motion.div>
  );
};

export default Logo;