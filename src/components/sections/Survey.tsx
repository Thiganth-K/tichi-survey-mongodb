import React from 'react';
import { motion } from 'framer-motion';
import { useSurvey } from '../../context/SurveyContext';
import { questions } from '../../data/questions';
import QuestionCard from '../QuestionCard';
import Button from '../Button';
import Logo from '../Logo';
import Background from '../Background';
import { CheckCircle, Send } from 'lucide-react';

const Survey: React.FC = () => {
  const { formData, updateResponse, submitSurvey, isSubmitting } = useSurvey();
  
  const getCurrentAnswer = (questionId: string) => {
    const response = formData.responses.find(
      (response) => response.questionId === questionId
    );
    return response?.answer;
  };
  
  const allQuestionsAnswered = formData.responses.length === questions.length;
  
  return (
    <section className="min-h-screen w-full py-12 px-6">
      <Background variant="survey" />
      
      <div className="max-w-3xl mx-auto">
        <Logo className="mx-auto mb-8" />
        
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Let's hear your thoughts
          </h2>
          <p className="mt-2 text-gray-600">
            Please answer the following questions to help us understand you better.
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onAnswer={updateResponse}
              currentAnswer={getCurrentAnswer(question.id)}
            />
          ))}
        </div>
        
        <motion.div 
          className="sticky bottom-0 bg-white bg-opacity-90 backdrop-blur-md py-4 mt-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between px-6">
            <div className="flex items-center text-gray-600 mb-4 md:mb-0">
              <CheckCircle 
                className={`mr-2 ${allQuestionsAnswered ? 'text-green-500' : 'text-gray-400'}`} 
              />
              <span>
                {formData.responses.length} of {questions.length} questions answered
              </span>
            </div>
            
            <Button
              onClick={submitSurvey}
              disabled={!allQuestionsAnswered}
              isLoading={isSubmitting}
              variant="tertiary"
            >
              <span>Submit Survey</span>
              <Send className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Survey;