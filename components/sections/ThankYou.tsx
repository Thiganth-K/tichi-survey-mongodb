import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from '../Logo';
import Button from '../Button';
import { useSurvey } from '../../context/SurveyContext';
import Background from '../Background';
import Confetti from 'react-confetti';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ArrowLeft } from 'lucide-react';

const ThankYou: React.FC = () => {
  const { formData, navigate } = useSurvey();
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <Background variant="thankYou" />
      
      {showConfetti && <Confetti width={width} height={height} />}
      
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Logo className="mx-auto mb-8" />
        
        <motion.div
          className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-card p-8"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Thank you, {formData.userInfo.fullName}!
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Your journey with Tichi starts now.
          </motion.p>
          
          <motion.p
            className="text-gray-500 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            We've received your responses and will use them to provide you with a personalized experience. 
            You'll receive a confirmation email shortly at {formData.userInfo.email}.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <Button 
              onClick={() => navigate('welcome')} 
              variant="primary"
            >
              <ArrowLeft className="mr-2" />
              <span>Back to Home</span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ThankYou;