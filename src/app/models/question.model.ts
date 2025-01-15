export interface Question {
  category: string;
  type: 'multiple' | 'boolean' | 'freetext';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers?: string[]; // Optional for freetext questions
}

export interface Category {
  name: string;
  questions: Question[];
}
