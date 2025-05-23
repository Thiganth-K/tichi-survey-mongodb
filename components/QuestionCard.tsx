import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question, SurveyResponse } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (response: SurveyResponse) => void;
  currentAnswer?: string | number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, currentAnswer }) => {
  const [localAnswer, setLocalAnswer] = useState<string | number>(currentAnswer || '');
  
  const handleChange = (value: string | number) => {
    setLocalAnswer(value);
    onAnswer({
      questionId: question.id,
      answer: value,
    });
  };
  
  const getBorderColor = () => {
    switch (question.category) {
      case 'people':
        return 'border-tichi-pink';
      case 'opportunity':
        return 'border-tichi-purple';
      case 'tichi':
        return 'border-tichi-yellow';
      default:
        return 'border-gray-300';
    }
  };
  
  const getGradientClass = () => {
    switch (question.category) {
      case 'people':
        return 'from-tichi-pink/10 to-transparent';
      case 'opportunity':
        return 'from-tichi-purple/10 to-transparent';
      case 'tichi':
        return 'from-tichi-yellow/10 to-transparent';
      default:
        return 'from-gray-100 to-transparent';
    }
  };

  return (
    <motion.div
      className={`w-full bg-white rounded-xl p-6 shadow-card border-l-4 ${getBorderColor()} mb-8`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px 0px" }}
      transition={{ duration: 0.5 }}
    >
      
      
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{question.text}</h3>
      
      {question.type === 'text' && (
        <textarea
          value={localAnswer as string}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tichi-purple focus:border-tichi-purple"
          rows={4}
          placeholder="Your answer..."
        />
      )}
      
      {question.type === 'scale' && (
        <div className="flex flex-wrap justify-between my-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <motion.button
              key={num}
              className={`w-9 h-9 rounded-full flex items-center justify-center m-1 border 
                ${parseInt(localAnswer as string) === num 
                  ? 'bg-tichi-pink text-white border-tichi-pink' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => handleChange(num)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {num}
            </motion.button>
          ))}
          <div className="flex justify-between w-full mt-2 text-sm text-gray-500">
            <span>Not at all likely</span>
            <span>Extremely likely</span>
          </div>
        </div>
      )}
      
      {question.type === 'multiChoice' && question.options && (
        <div className="space-y-3">
          {question.options.map((option) => (
            <div
              key={option}
              className={`w-full p-3 text-left rounded-lg border cursor-pointer transition-all duration-200
                ${localAnswer === option
                  ? 'bg-tichi-purple/10 border-tichi-purple text-tichi-purple'
                  : 'border-gray-200'}`}
              onClick={() => handleChange(option)}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center
                  ${localAnswer === option
                    ? 'border-tichi-purple'
                    : 'border-gray-400'}`}
                >
                  {localAnswer === option && (
                    <div className="w-2 h-2 rounded-full bg-tichi-purple" />
                  )}
                </div>
                {option}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default QuestionCard;