
import { Component, OnInit, AfterViewInit, ElementRef, ViewContainerRef, Inject, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IQuiz } from './quiz';
import { Question } from './question';
import { QuestionService } from './question.service';
import { QuizSolution } from './quiz-solution';
import { IPager } from './pager';
import {map, tap, catchError} from 'rxjs/operators';

declare var BookBlock: any;

@Component({
    moduleId: module.id,
    selector: 'my-take-quiz',
    templateUrl: './template/solve-quiz.component.html',
    styleUrls: ['./css/solve-quiz.component.css', './css/bookblock.css', '../styles/less/index.css']
})

export class TakeQuizComponent implements AfterViewInit {
    private qzid: any;
    private qxid: any;
    private sid: any;
    quiz: IQuiz;
    question: Question;
    questionId: number;
    questions: Question[];
    questionsCount: number;
    questionsAnswered: number;
    quizSolution: QuizSolution;
    //pagination
    itemsPerPage: number;
    totalItems: any;
    page: any;
    previousPage: any;
    pager: IPager;
    highlightAnswer: boolean[]
    errorMessage: any;
    bookBlock: any;
    bbArea: any;
    userId: string;
    //@ViewChild('blockbook') bbArea: ElementRef;
    constructor(
        private elRef: ElementRef,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private zone: NgZone,
        private questionService: QuestionService) {
        //this.bbArea = elRef.nativeElement.getElementsById("blockbook");
        
    }

    ngOnInit() {
        this.itemsPerPage = 1;
        this.page = 1;
        this.questions = [];
        this.resetHighlightAnswers();
        this.pager = <IPager>{};

        this.route.params.subscribe((params: Params) => {
            this.userId = params['uid'];
            console.log("user id from params");
            console.log(this.userId);
        });

        this.route
            .params
            .map(params => params['id'])
            .do(id => this.qzid = +id)
            .subscribe(id => {
                //this.getQuestions(id);
                this.questionService.getQuestions(id)
                    .subscribe(questions => {
                        this.questions = questions;
                        console.log(questions);
                        this.page = 1;
                        var idx = 0;
                        this.quizSolution = null;
                        this.questionId = questions[idx].id;
                        //this.question = questions[idx];
                        console.log("current question id=" + this.questionId);
                        this.questionsCount = questions.length;
                        this.questionsAnswered = 0;
                        //this.quiz = this.route.snapshot.data['quiz'];

                        //console.log("qz title=" + this.quiz.title);


                    });
            });

        this.totalItems = this.questions.length;

        this.pager.currentPage = 1;
        this.pager.pageSize = 1;
        this.pager.totalPages = this.questionsCount;

        let userId = JSON.parse(localStorage.getItem('myUserId'));
        console.log("uid in localStorage in take-quiz OnInit event " + userId);
    }

    ngAfterViewInit() {
        //this._vcr.createEmbeddedView(this.tpl);
        //this.vcRef.clear();


        //$(document).ready(function () {
        //    this.bookBlock = new BookBlock(this.bbArea, {
        //        speed: 500,
        //        shadowSides: 0.8,
        //        shadowFlip: 0.7
        //    });

        //    //self.$questionsPaging = $('.pagination');
        //});
    }

    ngAfterViewChecked() {
        //this.zone.runOutsideAngular(() => {
        //    this.bookBlock = new BookBlock(this.bbArea.nativeElement, {
        //        speed: 500,
        //        shadowSides: 0.8,
        //        shadowFlip: 0.7
        //    });
        //});

        console.log("ngAfterViewInit take-quiz qzid=" + this.qzid);
        //console.log(this.bbArea.nativeElement);
        //this.bbArea = document.getElementById("bb-blockbook");
        //this.bookBlock = new BookBlock(this.bbArea, {
        //    speed: 500,
        //    shadowSides: 0.8,
        //    shadowFlip: 0.7
        //});
    }



    public loadPage(page: number) {
        console.log("current page number=" + page);

        if (page !== this.previousPage) {
            this.previousPage = page;
            this.loadData();
        }
    }

    public selectAnswer(question: Question, index: number) {
        //this.progress();
        this.resetHighlightAnswers();

        console.log("selected index=" + index);
        question.selectedAnswer = index;

        //this.elRef.nativeElement.find('.active').addClass('answered');

        this.questionsAnswered = this.questions.filter(function (q) {
            return q.selectedAnswer >= 0;
        }).length;

        this.highlightAnswer[index] = true;
        //self.$questionsPaging.find('.active').addClass('answered');

        //this.page++;
        this.pager.currentPage++;
        this.flip(this.pager.currentPage);
    }

    public progress() {
        var total = this.questionsCount;
        var answered = this.questions.filter(function (q) {
            return q.selectedAnswer >= 0;
        }).length;

        var completedInPercent = Math.round((answered / total) * 100);

        //this.elRef.nativeElement.style = `width:${completedInPercent}%;`;
        //self.$progressBar.style = `width:${completedInPercent}%;`;

        return completedInPercent;
    };

    public submit() {
        console.log("submit quiz id=" + this.qzid);
       
        // retrieve the user id from session storage.  !!! always null, don't know why!!!
        //this.userId = JSON.parse(localStorage.getItem('myUserId'));
        console.log("submit user id");
        console.log(this.userId);
        var data = {
            forQuizId: this.qzid,
            forUserId: this.userId,
            selectedAnswerIds: this.questions.map(function (question) {
                console.log(question.answers[question.selectedAnswer].id);
                var id = question.answers[question.selectedAnswer].id;
                return id;
            })
        };

        console.log("posting data....", data);
        this.http.post('/api/quizzes/Solve', data)
            .pipe(
                map((res) => <QuizSolution>res
                //var result = res.json();
                //console.log(result);
                //var solution = <QuizSolution>res.json();
                //console.log(solution);
                //this.sid = solution.id;
                ),
                // ...and calling .json() on the response to return data
                tap(solution => {
                    console.log("solution id=" + solution.id);
                    console.log(solution);
                    
                    this.quizSolution = solution;
                    this.sid = solution.id;
                }),

                catchError(error => of(`Bad Promise: ${error}`))
            )
            .subscribe(() => {
                //this.router.navigate(['result', this.sid], { relativeTo: this.route });
            });

        //.subscribe(function (response) {
        //    console.log(response);
        //    //document.open();
        //    //document.write(response.json);
        //    //document.close();
        //}, error => this.errorMessage = <any>error);
    }

    private flip(toPageNumber) {

        setTimeout(function () {
            //self.bookBlock.jump(toPageNumber);
        }, 60);
    }

    private loadData() {

        this.resetHighlightAnswers();
        this.question = this.questions[this.page - 1];
        //this.route
        //    .params
        //    .map(params => params['id'])
        //    .do(id => this.qzid = +id)
        //    .subscribe(id => this.getQuestion(id, this.question.id));
        //this.getQuestion(this.qzid, this.qxid);
    }

    private resetHighlightAnswers() {
        this.highlightAnswer = [];
    }

    private getQuestions(id) {

        this.questionService.getQuestions(id)
            .subscribe(questions => this.questions = questions);


    }

    //private getQuestion(id, qxid) {
    //    this.questionService.getQuestion(id, qxid)
    //        .subscribe(question => this.question = question);
    //}
}