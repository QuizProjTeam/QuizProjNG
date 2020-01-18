
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolveQuizComponent } from './quiz/solve-quiz.component';
import { QuizEditComponent } from './quiz/quiz-edit.component';
import { QuizEditInfoComponent } from './quiz/quiz-edit-info.component';
import { QuizEditTagsComponent } from './quiz/quiz-edit-tags.component';

import { QuizListComponent } from './quiz/quiz-list.component';
import { QuizResolver } from './quiz/quiz-resolver.service';
import { LoginComponent } from './user/login.component';
import { LogoutComponent } from './user/logout.component';
import { CanActivateAuthGuard } from './can-activate.service';

import { PageNotFoundComponent } from './page-not-found.component';

import { QuizResultComponent } from './quiz/quiz-result.component';

import { QuizEditGuard } from './quiz/quiz-guard.service';

import { TakeQuizComponent } from './quiz/take-quiz.component';

import { MakeQuizComponent } from './quiz/make-quiz.component';

import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';

//test
import { SkillListComponent } from './skill/skill-list.component';
import { SkillComponent } from './skill/skill.component';

const routes: Routes = [
   
    //{ path: 'login', component: LoginComponent },
    
    {
        path: '', component: SiteLayoutComponent,
        children: [
            //{ path: '', redirectTo: '/quizs', pathMatch: 'full' },
            { path: 'quizs', component: QuizListComponent ,
                children: [
                    {
                        path: ':id',
                        component: SolveQuizComponent,
                        resolve: { quiz: QuizResolver },
                    },

                    {
                        path: ':id/edit',
                        component: QuizEditComponent,
                        canDeactivate: [QuizEditGuard],
                        resolve: { quiz: QuizResolver },
                        children: [
                            { path: '', redirectTo: 'info', pathMatch: 'full' },
                            { path: 'info', component: QuizEditInfoComponent },
                            { path: 'tags', component: QuizEditTagsComponent }
                        ]
                    },
               ]
            },
            
            {
                path: 'quizs:id/result',
                component: QuizResultComponent,
                //canDeactivate: [ProductEditGuard],
                children: [
                    { path: '', redirectTo: '/quizs:id/result', pathMatch: 'full' },
                    {
                        path: ':sid',
                        component: QuizResultComponent,
                      
                    },
                ]
            },
            //{
            //    path: ':id/result:id',
            //    component: QuizResultComponent,
            //    //canDeactivate: [ProductEditGuard],
                
            //},
            
         
        ]
  
    },
    {
        path: 'admin/quizs', component: QuizEditComponent,
        children: [
            {
                path: ':id/edit',
                component: QuizEditComponent,
                canDeactivate: [QuizEditGuard],
                resolve: { quiz: QuizResolver },
                children: [
                    { path: '', redirectTo: 'info', pathMatch: 'full' },
                    { path: 'info', component: QuizEditInfoComponent },
                    { path: 'tags', component: QuizEditTagsComponent }
                ]
            },
        ]
    },
    {
        path: 'editquiz/:id/make/:uid', component: MakeQuizComponent,
        resolve: { quiz: QuizResolver },
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: QuizEditInfoComponent },
            { path: 'tags', component: QuizEditTagsComponent }
        ]
    },
    {
        //path: '', component: TakeQuizLayoutComponent
        path: 'solvequiz/:id/take/:uid', component: TakeQuizComponent,
        
    },
    { path: 'user', loadChildren: '/Scripts/user/user.module#UserModule' },
    //{ path: 'solvequiz', loadChildren: '/Scripts/solvequiz/solve-quiz.module#SolveQuizModule' },
    //{ path: 'coders', component: CoderListComponent },
    //{ path: 'coders/:id', component: CoderComponent },
    //{ path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const
    routableComponents = [
    //SkillListComponent,
    //SkillComponent,
    //CoderListComponent,
    //    CoderComponent,
        LoginComponent,
        PageNotFoundComponent,
        SolveQuizComponent,
        TakeQuizComponent,
];


