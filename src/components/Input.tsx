import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  error,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <motion.div 
      className={`relative mb-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`
            w-full px-4 py-3 text-gray-800 bg-white/90 
            border-2 border-gray-200 rounded-lg shadow-input
            backdrop-blur-sm transition-all duration-300
            focus:outline-none focus:border-tichi-purple focus:ring-2 focus:ring-tichi-purple/20
            ${error ? 'border-red-500' : ''}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <motion.label
          htmlFor={id}
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none
            ${isActive 
              ? 'text-sm text-tichi-purple -top-2.5 bg-white px-1' 
              : 'text-gray-500 top-3'}
          `}
          animate={isActive ? { top: '-0.625rem', fontSize: '0.875rem' } : { top: '0.75rem', fontSize: '1rem' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {label}{required && ' *'}
        </motion.label>
      </div>
      {error && (
        <motion.p 
          className="mt-1 text-red-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Input;