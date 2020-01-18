import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
//import { Quiz } from './quiz';
import { QuizEval } from './quiz-eval';
import { CONFIG } from '../config';

import { HttpClient } from '@angular/common/http';
import {map, tap, catchError} from 'rxjs/operators';


let quizEvalUrl = CONFIG.baseUrls.quizEval;

@Injectable()
export class QuizEvalService {
    constructor(private http: HttpClient) { }

    getQuizEval(id:number) {
        return this.http
            .get(quizEvalUrl + "/" + id)
            .pipe(
                map((res) => <QuizEval> res)
            )
    }

   
}