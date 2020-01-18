///<reference path="../json-loader.d.ts" />
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
//!!!FR heed to the filter library location
//import { filter } from 'rxjs/operator/filter';
import { filter } from 'rxjs/operators';

import { IQuiz } from '../quiz/quiz';
import { Question } from '../quiz/question';
import {map, tap, catchError} from 'rxjs/operators';
import * as qq3 from '../../assets/question-quiz-3.json';
import * as qq5 from '../../assets/question-quiz-5.json';
import * as catlist from '../../assets/category-quiz.json';
import * as solutions from '../../assets/quiz-evaluations.json';

import { QuizEditTagsComponent } from '../quiz/quiz-edit-tags.component';

import { AutoIDGenerator } from '../shared/data/autoid-generator';
import { QuizSolution } from '../quiz/quiz-solution';

//declare function require(url: string);
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor(private http: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        let quizs: any[] = JSON.parse(localStorage.getItem('quizs')) || [];
        console.log('localStorage data:');
        console.log(JSON.stringify(quizs));

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            ///quizzes/solve
            if (request.url.endsWith('/quizzes/Solve')){
                console.log('solve quiz...');
                    // get updated quiz object from post body
                let solution = request.body;
                let qid = solution.forQuizId;
                console.log('solve quiz id: ' + qid);
                var qsolutions: QuizSolution[] = <any>solutions;
                let qsolution = qsolutions.filter(qsol => {return qsol.forQuizId === qid})[0]
                //var autoGen = new AutoIDGenerator("YT.solution");
                //solution.id = autoGen.GetAutoID();
                console.log(qsolution);
                
                localStorage.setItem('qsolution', JSON.stringify(qsolution));
                 // respond 200 OK
                 return of(new HttpResponse({ status: 200, body: qsolution }));
            }
            ///quizzes/getQuizQuestions
            if (request.url.indexOf('/quizzes/getQuizQuestions') >= 0){
                var questions2:any[];
                console.log('using local quiestions data...')
                var segment3 = request.url.split('/');
                var id:number = Number(segment3[segment3.length - 1]);
                console.log(id);
                var quiz = quizs.filter(quiz => {return quiz.id === id})[0];
                if (quiz.questions === undefined || quiz.questions === null || quiz.questions.length === 0 > 0){
                    //load questions from a fie
                    console.log("loading local question data...")
                    let _localFileURL = '../../assets/question-quiz-' + id.toString() + '.json';    
                    console.log(_localFileURL);
                    if (id == 3){
                    questions2 = <any>qq3;       // require(_localFileURL);
                    }
                    else if (id == 5){
                        questions2 = <any> qq5;
                    }

               }
               else {
                   questions2 = quiz.questions;
               }
                return of(new HttpResponse({ status: 200, body: questions2 }));
            }
            ///quizzes/Create
            if (request.url.endsWith('/quizzes/Create')){
                console.log('create local quiz data...');
                
                // get updated quiz object from post body
                let createdQuiz = request.body;
                var autoGen = new AutoIDGenerator("YT.quiz");
                createdQuiz.id = autoGen.GetAutoID();
                quizs.push(createdQuiz);
                console.log(createdQuiz);
                
                localStorage.setItem('quizs', JSON.stringify(quizs));
                 // respond 200 OK
                 return of(new HttpResponse({ status: 200 }));
            }

            // update the quiz by quiz id
            if (request.url.indexOf('/quizzes/Update') > 0){
                console.log('update local quiz data...');
                var segment = request.url.split('/');
                var id:number = Number(segment[segment.length - 1]);
                console.log(id);
                // get updated quiz object from post body
                let updatedQuiz = request.body;
                //var quiz = quizs.filter(quiz => {return quiz.id === id})[0]; 
                var idx = quizs.findIndex(quiz => quiz.id === id);
                //update it  
                quizs[idx] = updatedQuiz;    
               
                //console.log(quiz);
                localStorage.setItem('quizs', JSON.stringify(quizs));
                 // respond 200 OK
                 return of(new HttpResponse({ status: 200 }));
            }
            // get a list of category
            if (request.url.endsWith('/Categories/GetCategories')){
                console.log('using local category data...')
                var categories:any[] = <any>catlist;
                return of(new HttpResponse({ status: 200, body: categories }));
            }

            // get a list of quiz
            if (request.url.endsWith('/quizzes/getQuizList')){
                console.log('using local quiz data...')
                return of(new HttpResponse({ status: 200, body: quizs }));
            }

            // get a quiz
            if (request.url.indexOf('/quizzes/getQuiz') > 0){
                console.log('using local quiz data for an id...')
                var segment = request.url.split('/');
                var id:number = Number(segment[segment.length - 1]);
                //var id:string = segment[segment.length - 1];
                console.log(id);
                //var quiz = quizs.filter(function(item) {return item.id === id})[0];
                var quiz = quizs.filter(quiz => {return quiz.id === id})[0];                
                console.log(quiz);
                return of(new HttpResponse({ status: 200, body: quiz }));
            }

            //quizzes/getManageQuizQuestions
            // get a quiz questions
            if (request.url.indexOf('/quizzes/getManageQuizQuestions') > 0){
                console.log('using local quiz question data for an id...')
                var questions:any[];
                let segment2 = request.url.split('/');
                console.log(request.url);
                console.log(segment2.length);
                console.log(segment2[segment2.length - 1]);
                var id:number = Number(segment2[segment2.length - 1]);
                console.log(id);
                var quiz = quizs.filter(quiz => {return quiz.id === id})[0];
                if (quiz.questions === undefined || quiz.questions === null || quiz.questions.length === 0 > 0){
                     //load questions from a fie
                     console.log("loading local question data...")
                     let _localFileURL = '../../assets/question-quiz-' + id.toString() + '.json';    
                     console.log(_localFileURL);
                     if (id == 3){
                     questions = <any>qq3;       // require(_localFileURL);
                     }
                     else if (id == 5){
                         questions = <any> qq5;
                     }
 
                }
                else {
                    questions = quiz.questions;
                }

                console.log(questions);
                return of(new HttpResponse({ status: 200, body: questions }));
            }


            //below are from the sample
            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};