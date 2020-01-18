import { QuestionResult } from './question-result';
export class QuizEval {
    forQuizId: number;
    title: string;
    correctlyAnswered: QuestionResult[];
    incorrectlyAnswered: QuestionResult[];
    totalQuestions: number;
    public getSuccessPercentage() {
        return this.correctlyAnswered.length / this.totalQuestions * 100;
    }
}