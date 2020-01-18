import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Question } from './question';
import { IQuiz } from './quiz';
import { QuestionService } from './question.service';


@Component({
    templateUrl: 'template/quiz-edit-info.component.html'
})
export class QuizEditInfoComponent implements OnInit {
    @ViewChild(NgForm) quizForm: NgForm;

    errorMessage: string;
    quiz: IQuiz;
    question: Question;
    showEditQuestion: boolean;
    backup: string;

    constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.quiz = data['quiz'];
            console.log("quiz info onInit to get data['quiz']");
            if (this.quiz.id > 0) {
                if (this.quiz.questions.length == 0) {
                    this.questionService.getManageQuestions(this.quiz.id).subscribe(
                        questions => {
                            if (questions.length > 0) {
                                this.quiz.questions = questions;
                                this.quiz.numberOfQuestions = questions.length;
                                console.log(this.quiz);
                            }

                        });
                }
            }
            //console.log(this.quiz);
            if (this.quizForm) {
                //this.quizForm.reset();
            }
        });
    }

    public addQuestion() {
        this.showEditQuestion = true;
        
        var numOfQx = this.quizForm.controls["quizQuestionsCount"].value;
        console.log("numOfQx=" + numOfQx);
        //this.quiz.questions = [];
        //this.quiz.numberOfQuestions = numOfQx;
        this.backup = '';
        this.initQuestion();
    }

    public numOfQxMatch() {
        //if (this.quizForm.controls["quizQuestionsCount"].value == undefined) {
        //    this.quizForm.controls["quizQuestionsCount"].setValue(3);
        //}
        var numOfQx = this.quiz.numberOfQuestions;      // this.quizForm.controls["quizQuestionsCount"].value;
        var qxCnt = this.quiz.questions.length;
        return qxCnt === numOfQx;
    }

    public openEditQuestion() {
        this.showEditQuestion = true;

    }

    public handleCancelEditQuestion(value) {
        this.showEditQuestion = !value;
    }

    public handleOpenEditQuestion(question: Question) {
        
        if (question) {
            this.showEditQuestion = true;
            this.question = question;
            this.backup = JSON.stringify(question);
        } else {
            this.initQuestion
        }
    }

    public handleDeleteQuestion(idx: number) {
        this.quiz.questions.splice(idx, 1);
    }

    initQuestion() {
        this.question = {
            id: 0,
            title: '',
            answers: [],
            selectedAnswer: 0,
            correctAnswer: 0,
        };
    }

    

   
  
}
