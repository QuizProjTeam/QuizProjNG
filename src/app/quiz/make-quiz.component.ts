import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { IQuiz } from './quiz';
import { QuizService } from './quiz.service';
import { QuestionService } from './question.service';
import { MessageService } from '../messages/message.service';
import { SharedService } from '../shared/shared-service';

@Component({
    moduleId: module.id,
    selector: "edit-quiz",
    templateUrl: './template/quiz-edit.component.html',
    styleUrls: ['./css/quiz-edit.component.css']
})
export class MakeQuizComponent implements OnInit {
    @Output() savedQuiz = new EventEmitter();
    pageTitle: string = 'Quiz Edit';
    errorMessage: string;

    private dataIsValid: { [key: string]: boolean } = {};
    private currentQuiz: IQuiz;
    private originalQuiz: IQuiz;
    private qzid: number;
    private userId: string;

    get quiz(): IQuiz {
        return this.currentQuiz;
    }
    set quiz(value: IQuiz) {
        this.currentQuiz = value;
        // Clone the object to retain a copy
        this.originalQuiz = Object.assign({}, value);
    }

    get isDirty(): boolean {
        return JSON.stringify(this.originalQuiz) !== JSON.stringify(this.currentQuiz);
    }

    constructor(private quizService: QuizService,
        private questionService: QuestionService, 
        private messageService: MessageService,
        private sharedService: SharedService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.userId = params['uid'];
            console.log("user id from params");
            console.log(this.userId);
        });

        //retrive the data that is provided by the resoler
        this.route.data.subscribe(data => {
            this.onQuizRetrieved(data['quiz']);
        });

        

        //this.route
        //    .params
        //    .map(params => params['id'])
        //    .do(id => this.qzid = +id)
        //    .subscribe(id => {
        //        console.log("id from params");
        //        console.log(id);
        //        this.quizService.getQuiz2(id)
        //            .subscribe(quiz => {
        //                this.quiz = quiz;
        //                //this.currentQuiz = quiz;
        //                console.log("current quiz id=" + this.qzid);
        //                console.log("current quiz");
        //                console.log(this.currentQuiz);

        //            })
        //    });
    }

    quizClick(Quiz: IQuiz) {
        console.log("quizClick=" + Quiz);
        this.quiz = Quiz;
    }

    onQuizRetrieved(Quiz: IQuiz): void {
        
        this.quiz = Quiz;

        if (this.quiz.id === 0) {
            this.pageTitle = 'Add Quiz';
        } else {
            this.pageTitle = `Edit Quiz: ${this.quiz.title}`;

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

        
    }

    deleteQuiz(): void {
        if (this.quiz.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the Quiz: ${this.quiz.title}?`)) {
                this.quizService.deleteQuiz(this.quiz.id)
                    .subscribe(
                    () => this.onSaveComplete(`${this.quiz.title} was deleted`),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    isValid(path: string): boolean {
        //TODO: uncomment it
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    reset(): void {
        this.dataIsValid = null;
        this.currentQuiz = null;
        this.originalQuiz = null;
    }

    saveQuiz(): void {
        if (this.isValid(null)) {
            //set the createdBy field with the userId
            this.quiz.createdById = this.userId;
            this.quizService.saveQuiz(this.quiz)
                .subscribe(
                () => this.onSaveComplete(`${this.quiz.title} was saved`),
                (error: any) => this.errorMessage = <any>error
                );

        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        //raise the savedQuiz event
        console.log("raise the savedQuiz event");
        //this.savedQuiz.emit(true);
        this.sharedService.emitChange('Quiz saved in child');

        // Navigate back to the Quiz list
        this.router.navigate(['/quizs']);
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
        if (this.quiz.title && this.quiz.title.length >= 3 && this.quiz.description) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        if (this.quiz.category.id > 0 /*&& this.quiz.categoryId.length >= 3 */) {
            this.dataIsValid['tags'] = true;
        } else {
            this.dataIsValid['tags'] = false;
        }
    }
}
