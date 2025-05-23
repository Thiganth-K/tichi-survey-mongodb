import { Question } from '../types';

export const questions: Question[] = [
  // SECTION 1: Basics
  {
    id: 'q1',
    text: 'Your Name (Optional)',
    type: 'text',
    category: 'basics'
  },
  {
    id: 'q2',
    text: 'WhatsApp Number (For app updates & early access)',
    type: 'text',
    category: 'basics'
  },
  {
    id: 'q3',
    text: 'Your College Name',
    type: 'text',
    category: 'basics'
  },
  {
    id: 'q4',
    text: 'Your Year of Study',
    type: 'multiChoice',
    options: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'PG'],
    category: 'basics'
  },
  {
    id: 'q5',
    text: 'Your City',
    type: 'text',
    category: 'basics'
  },

  // SECTION 2: What You Need
  {
    id: 'q6',
    text: 'Have you ever looked for services like room rentals, assignments, or part-time jobs online?',
    type: 'multiChoice',
    options: ['Yes', 'No'],
    category: 'needs'
  },
  {
    id: 'q7',
    text: 'Which of these do you usually look for or offer? (Select all that apply)',
    type: 'multiChoice',
    options: [
      'PG/Room Rentals',
      'Freelance Gigs (Design, Coding, etc.)',
      'Notes/Assignments',
      'Part-Time Jobs',
      'Event Help / Management',
      'Tutoring / Mentoring',
      'Other'
    ],
    category: 'needs'
  },
  {
    id: 'q8',
    text: 'Where do you usually find these things now? (Choose what applies)',
    type: 'multiChoice',
    options: [
      'WhatsApp Groups/Status',
      'Instagram Pages',
      'Friends or Seniors',
      'JustDial / OLX',
      'I never find them easily',
      'Others'
    ],
    category: 'needs'
  },

  // SECTION 3: The Tichi Idea
  {
    id: 'q9',
    text: 'Would you use this app to find stuff or offer your own services?',
    type: 'multiChoice',
    options: [
      'Yes! Sounds super useful',
      'Maybe, depending on how it works',
      'Nah, not really my thing'
    ],
    category: 'tichi'
  },
  {
    id: 'q10',
    text: 'If you could post something useful or earn from it, what would you post? (Eg: I take notes, I can find rooms, I edit videos, I know tutors, etc.)',
    type: 'text',
    category: 'tichi'
  },
  {
    id: 'q11',
    text: 'How much would you be okay paying to unlock a useful contact?',
    type: 'multiChoice',
    options: ['₹5', '₹10', '₹20', 'Depends on how useful it is'],
    category: 'tichi'
  },

  // SECTION 4: Be Part of Tichi's Journey
  {
    id: 'q12',
    text: 'Would you like early access to Tichi before the official launch?',
    type: 'multiChoice',
    options: ['Yes! Add me please', 'No thanks'],
    category: 'tichi'
  },
  {
    id: 'q13',
    text: 'Want to be part of our "Tichi Campus Circle" (get perks, sneak peeks & goodies)?',
    type: 'multiChoice',
    options: ['Yes, sounds fun!', 'Maybe', 'Not right now'],
    category: 'tichi'
  }
];