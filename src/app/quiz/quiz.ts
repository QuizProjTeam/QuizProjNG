import { Category } from './Category';
import { Question } from './Question';
export class Quiz implements IQuiz {
    id: number;
    title: string;
    description: string;
    categoryId: number;
    category: Category;
    createdById: string;
    isPrivate: boolean;
    shuffleAnswers: boolean;
    numberOfQuestions: number;
    questions: Question[];
    tags?: string[];
}

export interface IQuiz {
    id: number;
    title: string;
    description: string;
    categoryId: number;
    category: Category;
    createdById: string;
    isPrivate: boolean;
    shuffleAnswers: boolean;
    numberOfQuestions: number;
    questions: Question[];
    tags?: string[];
}