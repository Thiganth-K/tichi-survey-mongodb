import React, { createContext, useContext, useState } from 'react';
import { FormData, SectionType, SurveyResponse, UserInfo } from '../types';
import { saveAs } from 'file-saver';

interface SurveyContextType {
  currentSection: SectionType;
  formData: FormData;
  isSubmitting: boolean;
  navigate: (section: SectionType) => void;
  updateUserInfo: (info: UserInfo) => void;
  updateResponse: (response: SurveyResponse) => void;
  submitSurvey: () => Promise<void>;
}

const defaultFormData: FormData = {
  userInfo: {
    fullName: '',
    email: '',
  },
  responses: [],
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<SectionType>('welcome');
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = (section: SectionType) => {
    window.scrollTo(0, 0);
    setCurrentSection(section);
  };

  const updateUserInfo = (info: UserInfo) => {
    setFormData((prev) => ({
      ...prev,
      userInfo: info,
    }));
  };

  const updateResponse = (response: SurveyResponse) => {
    setFormData((prev) => {
      const existingResponseIndex = prev.responses.findIndex(
        (r) => r.questionId === response.questionId
      );

      if (existingResponseIndex !== -1) {
        const updatedResponses = [...prev.responses];
        updatedResponses[existingResponseIndex] = response;
        return {
          ...prev,
          responses: updatedResponses,
        };
      } else {
        return {
          ...prev,
          responses: [...prev.responses, response],
        };
      }
    });
  };

  const submitSurvey = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      // Simulate API delay or make actual API call
      // await new Promise((resolve) => setTimeout(resolve, 1500)); // Removed simulation delay

      const response = await fetch('http://localhost:5000/api/survey/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Parse error response if available
        const errorData = await response.json().catch(() => ({ message: 'Failed to submit survey' }));
        console.error('Error submitting survey:', response.status, errorData.message);
        throw new Error(errorData.message || 'Failed to submit survey');
      }

      // Navigate to thank you page
      navigate('thankYou');
    } catch (error) {
      console.error('Error submitting survey:', error);
      // You might want to show an error message to the user here, e.g., using a state variable or toast notification
      alert(`Submission failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SurveyContext.Provider
      value={{
        currentSection,
        formData,
        isSubmitting,
        navigate,
        updateUserInfo,
        updateResponse,
        submitSurvey,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = (): SurveyContextType => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};