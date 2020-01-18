import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { QuizEditComponent } from './quiz-edit.component';


@Injectable()
export  class QuizEditGuard implements CanDeactivate<QuizEditComponent> {

    canDeactivate(component: QuizEditComponent): boolean {
        if (component.isDirty) {
            let QuizName = component.quiz.title || 'New Quiz';
            return confirm(`Navigate away and lose all changes to ${QuizName}?`);
        }
        return true;
    }
}
