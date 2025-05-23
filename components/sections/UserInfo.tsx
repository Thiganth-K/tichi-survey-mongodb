import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../Logo';
import Button from '../Button';
import Input from '../Input';
import { useSurvey } from '../../context/SurveyContext';
import Background from '../Background';
import { ArrowRight } from 'lucide-react';

const UserInfo: React.FC = () => {
  const { navigate, updateUserInfo, formData } = useSurvey();
  const [fullName, setFullName] = useState(formData.userInfo.fullName);
  const [email, setEmail] = useState(formData.userInfo.email);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      fullName: fullName.trim() === '' ? 'Name is required' : '',
      email: email.trim() === '' 
        ? 'Email is required' 
        : !validateEmail(email) 
          ? 'Please enter a valid email address' 
          : '',
    };
    
    setErrors(newErrors);
    
    if (newErrors.fullName === '' && newErrors.email === '') {
      updateUserInfo({ fullName, email });
      navigate('survey');
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <Background variant="userInfo" />
      
      <motion.div
        className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-card p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo className="mx-auto mb-8" />
        
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Let's get started!
        </motion.h2>
        
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Input
            id="fullName"
            label="Full Name"
            value={fullName}
            onChange={setFullName}
            required
            error={errors.fullName}
          />
          
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            required
            error={errors.email}
          />
          
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button 
              type="submit" 
              variant="secondary"
              fullWidth
            >
              <span>Continue</span>
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default UserInfo;