import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundProps {
  variant: 'welcome' | 'userInfo' | 'survey' | 'thankYou';
}

const Background: React.FC<BackgroundProps> = ({ variant }) => {
  const getGradientClass = () => {
    switch (variant) {
      case 'welcome':
        return 'from-tichi-yellow/40 via-tichi-yellow/20 to-transparent';
      case 'userInfo':
        return 'from-tichi-purple/30 via-tichi-purple/10 to-transparent';
      case 'survey':
        return 'from-tichi-pink/30 via-tichi-pink/10 to-transparent';
      case 'thankYou':
        return 'bg-gradient-to-r from-tichi-pink/30 via-tichi-yellow/30 to-tichi-purple/30';
      default:
        return 'from-tichi-yellow/40 via-tichi-yellow/20 to-transparent';
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className={`absolute inset-0 bg-gradient-to-b ${getGradientClass()}`} />
      
      {/* Animated Blobs */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-64 h-64 rounded-full opacity-20 bg-tichi-yellow blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      <motion.div
        className="absolute top-[30%] right-[5%] w-80 h-80 rounded-full opacity-20 bg-tichi-purple blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      <motion.div
        className="absolute bottom-[10%] left-[30%] w-96 h-96 rounded-full opacity-20 bg-tichi-pink blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </div>
  );
};

export default Background;