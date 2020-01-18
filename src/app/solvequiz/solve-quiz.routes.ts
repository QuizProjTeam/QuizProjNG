import { TakeQuizComponent } from '../quiz/take-quiz.component';
import { QuizResolver } from '../quiz/quiz-resolver.service';
import { QuizResultComponent } from '../quiz/quiz-result.component';

//export const userRoutes = [
//  { path: 'profile', component: ProfileComponent},
//  { path: 'login', component: LoginComponent },
//  { path: 'logout', component: LogoutComponent }
//]

export const solveQuizRoutes = [
    //{ path: '', pathMatch: 'full', redirectTo: 'solvequiz', },
    { path: 'take', component: TakeQuizComponent,
        children: [
            {
                path: ':id',
                component: TakeQuizComponent,
                resolve: { quiz: QuizResolver },

            },
            {
                path: ':id/result',
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
        ]
    },
]