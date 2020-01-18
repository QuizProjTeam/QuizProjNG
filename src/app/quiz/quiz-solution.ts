import { Answer } from './question';

export class QuizSolution {
    id: number;
    forQuizId: number;
    byUserId: string;
    selectedAnswers: Answer[];
}