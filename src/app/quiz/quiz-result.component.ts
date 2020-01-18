import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewContainerRef, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { QuizEval } from './quiz-eval';
import { Question } from './question';
import { QuizSolution } from './quiz-solution';
import { QuizEvalService } from './quiz-eval.service';

@Component({
    moduleId: module.id,
    templateUrl: './template/quiz-result.component.html',
    styleUrls: ['./css/quiz-result.component.css', 'css/bookblock.css', '../styles/less/index.css'],
    selector: "solution-area",
    encapsulation: ViewEncapsulation.None,
})

export class QuizResultComponent implements OnInit {
    @Input() solution: QuizEval;
    //correctlyAnswered: Question[];
    //incorrectlyAnswered: Question[];
    sid: number;
    quizEval: QuizEval;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private quizEvalService: QuizEvalService) { };

    public GetSuccessPercentage(){
        return 66;
    }

    ngOnInit() {
        console.log("quiz result init");
        //let sid = this.solution.id;
        //console.log("solution id: " + sid);
        
        this.quizEval = this.solution;
        console.log(this.quizEval);
    }

    // ngOnChanges(changes: SimpleChanges) {
    //     console.log("ngOnChanges event triggered...");
    //     //!!! FR test !!!
    //     return;
    //     // only run when property "solution" changed
    //     if (changes['solution']) {
    //         //this.sid = this.solution.id;
    //         this.quizEvalService.getQuizEval(this.sid)
    //             .subscribe(quizEval => {
    //                 this.quizEval = quizEval;
    //                 //var idx = this.page - 1;
    //                 //this.quiz = this.route.snapshot.data['quiz'];
    //                 console.log(this.quizEval);
    //                 //console.log("qz title=" + this.quiz.title);
    //             });
    //     }
    // }
}