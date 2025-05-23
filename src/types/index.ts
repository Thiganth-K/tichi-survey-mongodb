export interface UserInfo {
  fullName: string;
  email: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'scale' | 'multiChoice';
  options?: string[];
  category: 'basics' | 'needs' | 'tichi';
}

export interface SurveyResponse {
  questionId: string;
  answer: string | number;
}

export interface FormData {
  userInfo: UserInfo;
  responses: SurveyResponse[];
}

export type SectionType = 'welcome' | 'userInfo' | 'survey' | 'thankYou';