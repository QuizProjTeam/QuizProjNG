import { Component, OnInit, AfterViewInit, ElementRef, ViewContainerRef, Inject, ViewChild, NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {map, tap, catchError} from 'rxjs/operators';
import { IQuiz } from './quiz';
import { Question } from './question';
import { QuestionService } from './question.service';
import { QuizSolution } from './quiz-solution';
import { IPager } from './pager';
import { CONFIG } from '../config';
//import  Vue  from  'vue'
//import  BookBlock  from  'vue-bookblock'
//import * as $ from 'jquery';
//require('BoolBlock');
//declare var BookBlock: any;
declare var $ :any;

let quizSolveUrl = CONFIG.baseUrls.quizSolve;

@Component({
    moduleId: module.id,
    templateUrl: './template/solve-quiz.component.html',
    styleUrls: ['./css/solve-quiz.component.css', '../styles/less/index.css']
})

export class SolveQuizComponent implements AfterViewInit {
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

    //FR test
    list:string[] = [];
    //@ViewChild('blockbook') bbArea: ElementRef;

    headers: HttpHeaders ;
    private httpOptions = {
        headers: new HttpHeaders ({ 'Content-Type': 'application/x-www-form-urlencoded' })
      };
    constructor(
        private elRef: ElementRef,
        private vcRef: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private zone: NgZone,
        private questionService: QuestionService)
    {
        //this.bbArea = elRef.nativeElement.getElementsById("blockbook");

    }

    ngOnInit() {
        this.itemsPerPage = 1;
        this.page = 1;
        this.questions = [];
        this.resetHighlightAnswers();
        this.pager = <IPager>{};
       
        //FR test
        setTimeout(() => {
            //this.list = ["asf", "vzxca", "fasdf"];
            setTimeout(() => { this.initBookBlock() }, 1000);
          }, 1000);
        // $('#bb-bookblock').bookblock({
        //     speed: 500,
        //     shadowSides: 0.8,
        //     shadowFlip: 0.7
        //  });

        this.route
            .params
            .map(params => params['id'])
                .do(id => this.qzid = +id)
            .subscribe(id => {
                //this.getQuestions(id);
                this.questionService.getQuestions(id)
                    .subscribe(questions => {
                        console.log("subscribe getQuizQuestions...");
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
                        this.quiz = this.route.snapshot.data['quiz'];
                        
                        console.log("qz title=" + this.quiz.title);

                        
                    });
            });

        this.totalItems = this.questions.length;

        this.pager.currentPage = 1;
        this.pager.pageSize = 1;
        this.pager.totalPages = this.questionsCount;

       //add BookBlock init
       //this.initBookBlock();
       //console.log(this.bbArea.nativeElement);
        //this.bbArea = document.getElementById("bb-blockbook");
       
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

        console.log("ngAfterViewInit qzid=" + this.qzid);
        
    }

   

    public loadPage(page: number) {
        console.log("current page number=" + page);
        
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.pager.currentPage = page;
            this.loadData();
        }
        this.flip(this.pager.currentPage);
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
        //this.flip(this.pager.currentPage);
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
        console.log("submit quiz id=" + this.quiz.id);
        var data = {
            forQuizId: this.quiz.id,
            selectedAnswerIds: this.questions.map(function (question) {
                console.log(question.answers[question.selectedAnswer].id);
                var id = question.answers[question.selectedAnswer].id;
                return id;
            })
        };

        console.log("posting data....", JSON.stringify(data));
        console.log("posting url...", quizSolveUrl);
        this.http.post(quizSolveUrl, data, this.httpOptions)
        .pipe(
            map((res) => <QuizSolution>res
                //var result = res.json();
                //console.log(result);
                //var solution = <QuizSolution>res.json();
                //console.log(solution);
                //this.sid = solution.id;
            ), // ...and calling .json() on the response to return data
            tap(solution => {
                //console.log("solution id=" + solution.id);
                console.log(solution);
                
                this.quizSolution = solution;
                //this.sid = solution.id;
            })
        )
         .subscribe(() => {
                //this.router.navigate(['result', this.sid], { relativeTo: this.route });
            });
            // .catchError((error: any) => Observable.throw(<any>error || 'Server error')) //...errors if
           

            //.subscribe(function (response) {
            //    console.log(response);
            //    //document.open();
            //    //document.write(response.json);
            //    //document.close();
            //}, error => this.errorMessage = <any>error);
    }

    private flip(toPageNumber) {

        setTimeout(function () {
            console.log('flip to the page ' + toPageNumber);
            $('#bb-bookblock').bookblock('jump', toPageNumber);
            
           //this.page.$bookBlock.jump(toPageNumber);
           //this.bookblock.jump(toPageNumber);
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
    private initBookBlock(): void {
        var Page = (function() {      
          var config = {
            $bookBlock : $( '#bb-bookblock' ),
            $navNext : $( '#bb-nav-next' ),
            $navPrev : $( '#bb-nav-prev' ),
            $navFirst : $( '#bb-nav-first' ),
            $navLast : $( '#bb-nav-last' )
          },
          init = function() {
            config.$bookBlock.bookblock( {
              speed : 1000,
              shadowSides : 0.8,
              shadowFlip : 0.4
            } );
            initEvents();
          },
          initEvents = function() {
            
            var $slides = config.$bookBlock.children();
    
            // add navigation events
            config.$navNext.on( 'click touchstart', function() {
              config.$bookBlock.bookblock( 'next' );
              return false;
            } );
    
            config.$navPrev.on( 'click touchstart', function() {
              config.$bookBlock.bookblock( 'prev' );
              return false;
            } );
    
            config.$navFirst.on( 'click touchstart', function() {
              config.$bookBlock.bookblock( 'first' );
              return false;
            } );
    
            config.$navLast.on( 'click touchstart', function() {
              config.$bookBlock.bookblock( 'last' );
              return false;
            } );
            
            // add swipe events
            $slides.on( {
              'swipeleft' : function( event ) {
                config.$bookBlock.bookblock( 'next' );
                return false;
              },
              'swiperight' : function( event ) {
                config.$bookBlock.bookblock( 'prev' );
                return false;
              }
            } );
    
            // add keyboard events
            $( document ).keydown( function(e) {
              var keyCode = e.keyCode || e.which,
                arrow = {
                  left : 37,
                  up : 38,
                  right : 39,
                  down : 40
                };
    
              switch (keyCode) {
                case arrow.left:
                  config.$bookBlock.bookblock( 'prev' );
                  break;
                case arrow.right:
                  config.$bookBlock.bookblock( 'next' );
                  break;
              }
            } );
          };
    
          return { init : init };
      
        })();
        Page.init();
    }
}