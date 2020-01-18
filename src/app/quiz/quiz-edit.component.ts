import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';

import { IQuiz, Quiz } from './quiz';
import { QuizService } from './quiz.service';
import { QuestionService } from './question.service';
import { MessageService } from '../messages/message.service';
import { SharedService } from '../shared/shared-service';

import { RoutesRecognized, ChildActivationEnd} from '@angular/router';

import { AutoIDLocalStorageService } from '../shared/data/autoid-local-storage.service';


@Component({
    moduleId: module.id,
    selector: "edit-quiz",
    templateUrl: './template/quiz-edit.component.html',
    styleUrls: ['./css/quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {
    @Output() savedQuiz = new EventEmitter();
    pageTitle: string = 'Quiz Edit';
    errorMessage: string;

    private dataIsValid: { [key: string]: boolean } = {};
    private currentQuiz: IQuiz;
    private originalQuiz: IQuiz;

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

    constructor(private QuizService: QuizService,
        private questionService: QuestionService, 
        private messageService: MessageService,
        private sharedService: SharedService,
        private route: ActivatedRoute,
        private router: Router) { }

        private routeData;

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.onQuizRetrieved(data['quiz']);
        });

        // this.router.events
        //     .filter(event => event instanceof ActivationEnd)
        //     .take(1)
        //     .subscribe(event => {
        //         console.log("output event's snapshot data...");
        //         console.log(event['snapshot'].data);
        //     });
        // this.router.events.subscribe((data) => {
        //     if (data instanceof ActivationEnd) {
        //       this.routeData= data.snapshot.params;
        //       console.log("output the routeData...");
        //       console.log(this.routeData);
        //       this.onQuizRetrieved(this.routeData['quiz']);
        //     }
        //     // if (data instanceof RoutesRecognized) {
        //     //     //this.routeData = data.state.root.firstChild.data;
        //     //     this.routeData = this.route.snapshot.data;
        //     //     this.onQuizRetrieved(this.routeData['quiz']);
        //     //   }
        //   });
    }

    quizClick(Quiz: IQuiz) {
        console.log("quizClick event!");
        console.log(Quiz);
        this.quiz = Quiz;
    }

    onQuizRetrieved(Quiz: IQuiz): void {
        console.log("onQuizRetrieved");
        console.log(Quiz);
        this.quiz = Quiz;

        if (this.quiz.id === 0) {
            this.pageTitle = 'Add Quiz';
            //use Andrew's autoID service
            //this.quiz = new AutoIDLocalStorageService<Quiz>('YT.quiz', 'id', null);
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
                this.QuizService.deleteQuiz(this.quiz.id)
                    .subscribe(
                    () => this.onSaveComplete(`${this.quiz.title} was deleted`),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    isValid(path: string): boolean {
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
            this.QuizService.saveQuiz(this.quiz)
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
