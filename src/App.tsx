import React from 'react';
import { SurveyProvider, useSurvey } from './context/SurveyContext';
import Welcome from './components/sections/Welcome';
import UserInfo from './components/sections/UserInfo';
import Survey from './components/sections/Survey';
import ThankYou from './components/sections/ThankYou';

const SurveyContent: React.FC = () => {
  const { currentSection } = useSurvey();

  return (
    <main className="min-h-screen bg-gray-50">
      {currentSection === 'welcome' && <Welcome />}
      {currentSection === 'userInfo' && <UserInfo />}
      {currentSection === 'survey' && <Survey />}
      {currentSection === 'thankYou' && <ThankYou />}
    </main>
  );
};

function App() {
  return (
    <SurveyProvider>
      <SurveyContent />
    </SurveyProvider>
  );
}

export default App;