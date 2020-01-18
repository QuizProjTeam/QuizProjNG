
export class Answer{
    id: number;
    text: string;
    isCorrect: boolean;
}

export class Question {
    id: number;
    title: string;
    answers: Answer[];
    selectedAnswer: number;
    correctAnswer: number;
}