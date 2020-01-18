import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { QuizService } from './quiz.service';
import { QuestionService } from './question.service';
import { IQuiz } from './quiz';
import { Question } from './question';

@Injectable()
export class QuizResolver implements Resolve<IQuiz> {
    private questions: Question[];
    private quiz: IQuiz;
    constructor(private quizService: QuizService,
                private questionService: QuestionService, 
                private router: Router) { }

    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuiz> {
        let id = route.params['id'];
        console.log("resolver id=" + id);
        if (isNaN(id)) {
            console.log(`Quiz id was not a number: ${id}`);
            //this.router.navigate(['/quizs']);
            return of(null);
        }

        return this.quizService.getQuiz2(+id)
            .map(Quiz => {
            if(Quiz) {
                                //default to 6
                Quiz.numberOfQuestions = 0;
                Quiz.questions = [];
                return Quiz;
            }
            console.log(`Quiz was not found: ${id}`);
            this.router.navigate(['/quizs']);
            return null;
        });

        //this.questionService.getQuestions(+id).subscribe(questions => {
        //    this.questions = questions;
        //});


        //return this.quizService.getQuiz(+id)
        //    .flatMap(q => {
        //        this.quiz = q; // save the quiz
        //        return Observable.of(q); // pass on the Observable
        //    })
        //    .flatMap(q => {
        //        return this.questionService.getQuestions(this.quiz.id)
        //            .map(qxs => {
        //                this.questions = qxs;
        //                q.questions = this.questions
        //                //return q;
        //            })
        //    })
        //    .subscribe();
       
    
    }
}
