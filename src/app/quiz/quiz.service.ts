import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/observable/of';
import { of } from 'rxjs';

import { IQuiz } from './quiz';

import { CONFIG } from '../config';
import { Category } from './category';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, tap, catchError} from 'rxjs/operators';

let quizsUrl = CONFIG.baseUrls.quizs;
let quizUrl = CONFIG.baseUrls.quiz;
let quizCreateUrl = CONFIG.baseUrls.quizCreate;
let quizUpdateUrl = CONFIG.baseUrls.quizUpdate;

@Injectable()
export class QuizService {
    private baseUrl = 'api/quizs';
    constructor(private http: HttpClient) { }

    tokenKey: string = 'accessToken';
    token: string;
    headers: HttpHeaders ;
    private httpOptions = {
        headers: new HttpHeaders ({ 'Content-Type': 'application/x-www-form-urlencoded' })
      };
    
    createAuthorizationHeader() {
        this.token = sessionStorage.getItem(this.tokenKey);
        console.log(this.token)
        if (this.token) {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
        }
        //headers.append('Authorization', 'Basic ' +
        //    btoa('username:password'));
    }


    getQuizs() {
        //let headers = new Headers();
        this.createAuthorizationHeader();
        console.log(this.headers);
        return this.http
            .get(quizsUrl, {
                headers: this.headers
            })
            .pipe(
                map((res) => <IQuiz[]> res)
            )
    }

    getQuiz2(id: number) {
        if (id === 0) {
            console.log('Quiz id is zero, the add mode');
            return of(this.initializeQuiz());
        };

        this.createAuthorizationHeader();
        console.log(this.headers);
        return this.http
            .get(quizUrl + "/" + id , {
                headers: this.headers
            }
            )
            .pipe(
                map((res) => <IQuiz> res)
            )
    }

    getQuiz(id: number) {
        if (id === 0) {
            console.log('Quiz id is zero, the add mode');
            return Observable.of(this.initializeQuiz());
        };
        //const url = `${this.baseUrl}/${id}`;
        //return this.http.get(url)
        //    .map(this.extractData)
        //    .do(data => console.log('getProduct: ' + JSON.stringify(data)))
        //    .catch(this.handleError);
        return this.getQuizs()
            .map(quizs => quizs.find(quiz => quiz.id === id))
            ;
    }

    initializeQuiz(): IQuiz {
        // Return an initialized object
        return {
            id: 0,
            title: null,
            description: null,
            categoryId: null,
            category: {
                id: 0, name: null, AvatarUrl: null
            },
            createdById: null,
            isPrivate: true,
            shuffleAnswers: false,
            questions:[],
            numberOfQuestions: 3,
        };
    }


    saveQuiz(quiz: IQuiz): Observable<IQuiz> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
        //let options = new RequestOptions({ headers: headers });
        

        if (quiz.id === 0) {
            return this.createQuiz(quiz);
        }
        return this.updateQuiz(quiz);
    }

    private createQuiz(quiz: IQuiz): Observable<IQuiz> {
        quiz.id = undefined;
        return this.http.post(quizCreateUrl, quiz, this.httpOptions)
            .pipe(
                map(res => <IQuiz> res),
                tap(data => console.log('createQuiz: ' + JSON.stringify(data)))
            );
    }

    // private extractData(response: Response) {
    //     return response.text() ? response.json() : {};
    //     //let body = response.json();
    //     //return body.data || {};
    // }

    private updateQuiz(quiz: IQuiz): Observable<IQuiz> {
        const url = `${quizUpdateUrl}/${quiz.id}`;
        return this.http.put(url, quiz, this.httpOptions)
            .map(() => quiz)
            .do(data => console.log('updateQuiz: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    deleteQuiz(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, this.httpOptions)
            .do(data => console.log('deleteQuiz: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.statusText || 'Server error');
    }
}