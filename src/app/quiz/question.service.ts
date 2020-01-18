///api/quizzes/GetQuizQuestions/1

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Question } from './question';

import { CONFIG } from '../config';

import { HttpClient } from '@angular/common/http';
import {map, tap, catchError} from 'rxjs/operators';

let questionsUrl = CONFIG.baseUrls.questions;
let manageQuestionsUrl = CONFIG.baseUrls.manageQuestions;

@Injectable()
export class QuestionService {
    constructor(private http: HttpClient) { }

    getQuestions(qzid: number) {
        console.log("getQuestions: qzid=" + qzid);
        return this.http
            .get(questionsUrl + "/" + qzid)
            .pipe(
                map((res) => <Question[]>res)
            );
    }

    getQuestion(qzid: number, id: number) {
        return this.getQuestions(qzid)
            .map(questions => questions.find(question => question.id === id));
    }

    getManageQuestions(qzid: number) {
        console.log("getManageQuestions: qzid=" + qzid);
        return this.http
            .get(manageQuestionsUrl + "/" + qzid)
            .pipe(
                map((res) => <Question[]> res)
            );
    }
}