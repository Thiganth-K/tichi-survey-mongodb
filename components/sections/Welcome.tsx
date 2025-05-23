import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../Logo';
import Button from '../Button';
import { useSurvey } from '../../context/SurveyContext';
import Background from '../Background';
import { ArrowRight } from 'lucide-react';

const Welcome: React.FC = () => {
  const { navigate } = useSurvey();

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <Background variant="welcome" />
      
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Logo className="mx-auto mb-10" />
        
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome to Tichi!
        </motion.h2>
        
        <motion.p
          className="text-xl text-gray-600 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Let's get to know you better.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Button 
            onClick={() => navigate('userInfo')}
            className="px-8 py-4 text-lg"
          >
            <span>Start</span>
            <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Welcome;