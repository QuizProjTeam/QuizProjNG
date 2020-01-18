import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { solveQuizRoutes } from './solve-quiz.routes'
import { TakeQuizComponent } from '../quiz/take-quiz.component';

// used to create fake backend
import { fakeBackendProvider } from '../_helpers/fake-backend';

@NgModule({
    imports: [RouterModule.forChild(solveQuizRoutes)],
    //exports: [RouterModule, SolveQuizModule],
    declarations: [
        TakeQuizComponent,
    ],
    providers: [
        // provider used to create fake backend
      //fakeBackendProvider
    ]
})

export class SolveQuizModule { }