import { Component, Input, Output, Pipe, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { Answer } from './question';
import { Question } from './question';
import { IQuiz } from './quiz';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'add-question',
    providers: [],
    templateUrl: 'template/question-edit.component.html',
    styleUrls: ['css/question-edit.component.css'],
    
})


export class QuestionEditComponent implements OnInit  {
    @Input() quiz: IQuiz;
    @Input() question: Question;
    @Output() cancelEditQuestion = new EventEmitter();
    @ViewChild('questionForm') public questionForm: NgForm;
    @ViewChild('answerTextVar') answerTextElementRef;
    
    answer: Answer;
    modalIsOpen: boolean;
    pageSize: number = 10;
    page: any;
    previousPage: any;
    //answer letter: a, b, c, d, ...
    letters = 'abcdefghijk';
    //if it is true, the edit mode
    editMode: boolean;

    constructor() {
        //this.initQuestion();

        //{ id: 0, text: '', isCorrect: false }
    }

    ngOnInit() {
        if (this.question.title.length > 0) {
            this.editMode = true;
        }
    }

    cancel() {
        this.cancelEditQuestion.emit(true);
    }

    markCorrect(idx) {
        this.question.answers.forEach(function (answer, i) {
            answer.isCorrect = i === idx;
        });
    }

    removeAnswer(idx) {
        this.question.answers.splice(idx, 1);
        if (this.question.answers.length === 1) {
            this.question.answers[0].isCorrect = true;
        }
    }

    saveIsAvailable(frm) {

    }

    addAnswer() {
        //console.log("answer text: " + this.answer.text);
        this.answer = {
            id: 0, text: '', isCorrect: false
        };
        if (!this.question.answers.length) {
            this.answer.isCorrect = true;
        }

        this.question.answers.push(this.answer);
        var last = this.question.answers.length - 1;

        setTimeout(function () {
            try {
                //error: Property 'focus' does not exist on type 'Element'
                //document.getElementsByClassName('answer-field')[last].focus();
                this.answerTextElementRef[last].nativeElement.focus();

            } catch (e) {

            }

        }, 100);
    }

    ok() {
        if (this.editMode) {
            // if this is an edit, no need to return the question
            // it is already passed by reference
            //$uibModalInstance.close(null);
        } else {
            // return the question to be added to the quiz
            //$uibModalInstance.close(this.question);
            console.log(this.question);
            this.quiz.questions.push(this.question);
            //hide the add question panel
            this.cancelEditQuestion.emit(true);
            //this.initQuestion();
        }
    }
}