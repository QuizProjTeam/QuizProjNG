
import { Component, OnInit } from '@angular/core';
import { IQuiz } from './quiz';
import { QuizService } from './quiz.service';

@Component({
    moduleId: module.id,
    //selector: 'coder-list',
    templateUrl: './template/admin-quiz-list.component.html',
    styles: ['.quizs {list-style-type: none;}', '*.quiz li {padding: 4px;cursor: pointer;}']
})
export class AdminQuizListComponent implements OnInit {
    quizs: IQuiz[];
    public showEditQuiz: boolean;
    constructor(private quizService: QuizService) { }

    ngOnInit() {
        this.quizs = [];
        this.quizService.getQuizs()
            .subscribe(quizs => this.quizs = quizs);
    }


    handleSavedQuiz(value) {
        this.showEditQuiz = !value;
        console.log("saved quiz event handled!");
        this.quizs = [];
        this.quizService.getQuizs()
            .subscribe(quizs => this.quizs = quizs);
    }
}