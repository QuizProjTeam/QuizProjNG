import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { QuizService } from './quiz/quiz.service';
import { QuestionService } from './quiz/question.service';
import { QuizEvalService } from './quiz/quiz-eval.service';
import { QuizResolver } from './quiz/quiz-resolver.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav/navbar.component';
import { QuizListComponent } from './quiz/quiz-list.component';
import { QuizEditComponent } from './quiz/quiz-edit.component';
import { QuizEditInfoComponent } from './quiz/quiz-edit-info.component';
import { QuizEditTagsComponent } from './quiz/quiz-edit-tags.component';
import { SolveQuizComponent } from './quiz/solve-quiz.component';
import { QuizResultComponent } from './quiz/quiz-result.component';
import { MakeQuizComponent } from './quiz/make-quiz.component';
import { TakeQuizComponent } from './quiz/take-quiz.component';
//import { LogoutComponent } from './user/logout.component';
import { QuestionEditComponent } from './quiz/question-edit.component';
import { QuestionListComponent } from './quiz/question-list.component';
import { QuizEditGuard } from './quiz/quiz-guard.service';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';


import { PageNotFoundComponent } from './page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbdPaginationBasic } from './quiz/pagination-basic';
import { NgbdProgressbarShowvalue } from './quiz/progressbar-showvalue';
//import { NgbdTypeaheadFormat } from './quiz/typeahead-format';
import { NgbdModalBasic } from './quiz/modal-basic';

import { CategoryService } from './quiz/category.service';

import { FocusedInputDirective } from './shared/focused-input.directive';

/* Feature Modules */
//import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { SharedService } from './shared/shared-service';
import { AuthService } from './user/auth.service'

import { TOASTR_TOKEN, Toastr } from './shared/toastr.service'
//import { BOOKBLOCK_TOKEN, BookBlock } from './shared/bookblock.service'
declare let toastr: Toastr

//test
//import { SkillListComponent } from './skill/skill-list.component';
//import { SkillComponent } from './skill/skill.component';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
      AppRoutingModule,
      NgbModule.forRoot(),
      MessageModule,
    FormsModule
  ],
  declarations: [
      AppComponent,
      NavBarComponent,
      QuizListComponent,
      SolveQuizComponent,
      MakeQuizComponent,
      TakeQuizComponent,
      QuizEditComponent,
      QuizEditInfoComponent,
      QuizEditTagsComponent,
      QuizResultComponent,
      QuestionEditComponent,
      QuestionListComponent,
      SiteLayoutComponent,
      PageNotFoundComponent,
      NgbdProgressbarShowvalue,
      NgbdModalBasic,
      FocusedInputDirective,
  ],
  providers: [QuizService, QuestionService, QuizEvalService, CategoryService, QuizResolver, QuizEditGuard, SharedService,
      { provide: TOASTR_TOKEN, useValue: toastr },
      AuthService,
      {
          provide: 'canDeactivateCreateEvent',
          useValue: checkDirtyState
      },
      // provider used to create fake backend
      fakeBackendProvider
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

function checkDirtyState(component: QuizEditComponent) {
    if (component.isDirty)
        return window.confirm('You have not saved this event, Do you really want to cancel?')

    return true
}
