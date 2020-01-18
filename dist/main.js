(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_helpers/fake-backend.ts":
/*!******************************************!*\
  !*** ./src/app/_helpers/fake-backend.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../json-loader.d.ts" />
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var qq3 = __webpack_require__(/*! ../../assets/question-quiz-3.json */ "./src/assets/question-quiz-3.json");
var qq5 = __webpack_require__(/*! ../../assets/question-quiz-5.json */ "./src/assets/question-quiz-5.json");
var catlist = __webpack_require__(/*! ../../assets/category-quiz.json */ "./src/assets/category-quiz.json");
var solutions = __webpack_require__(/*! ../../assets/quiz-evaluations.json */ "./src/assets/quiz-evaluations.json");
var autoid_generator_1 = __webpack_require__(/*! ../shared/data/autoid-generator */ "./src/app/shared/data/autoid-generator.ts");
//declare function require(url: string);
var FakeBackendInterceptor = /** @class */ (function () {
    function FakeBackendInterceptor(http) {
        this.http = http;
    }
    FakeBackendInterceptor.prototype.intercept = function (request, next) {
        // array in local storage for registered users
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var quizs = JSON.parse(localStorage.getItem('quizs')) || [];
        console.log('localStorage data:');
        console.log(JSON.stringify(quizs));
        // wrap in delayed observable to simulate server api call
        return rxjs_1.of(null).pipe(operators_1.mergeMap(function () {
            ///quizzes/solve
            if (request.url.endsWith('/quizzes/Solve')) {
                console.log('solve quiz...');
                // get updated quiz object from post body
                var solution = request.body;
                var qid_1 = solution.forQuizId;
                console.log('solve quiz id: ' + qid_1);
                var qsolutions = solutions;
                var qsolution = qsolutions.filter(function (qsol) { return qsol.forQuizId === qid_1; })[0];
                //var autoGen = new AutoIDGenerator("YT.solution");
                //solution.id = autoGen.GetAutoID();
                console.log(qsolution);
                localStorage.setItem('qsolution', JSON.stringify(qsolution));
                // respond 200 OK
                return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: qsolution }));
            }
            ///quizzes/getQuizQuestions
            if (request.url.indexOf('/quizzes/getQuizQuestions') >= 0) {
                var questions2;
                console.log('using local quiestions data...');
                var segment3 = request.url.split('/');
                var id = Number(segment3[segment3.length - 1]);
                console.log(id);
                var quiz = quizs.filter(function (quiz) { return quiz.id === id; })[0];
                if (quiz.questions === undefined || quiz.questions === null || quiz.questions.length === 0 > 0) {
                    //load questions from a fie
                    console.log("loading local question data...");
                    var _localFileURL = '../../assets/question-quiz-' + id.toString() + '.json';
                    console.log(_localFileURL);
                    if (id == 3) {
                        questions2 = qq3; // require(_localFileURL);
                    }
                    else if (id == 5) {
                        questions2 = qq5;
                    }
                }
                else {
                    questions2 = quiz.questions;
                }
                return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: questions2 }));
            }
            ///quizzes/Create
            if (request.url.endsWith('/quizzes/Create')) {
                console.log('create local quiz data...');
                // get updated quiz object from post body
                var createdQuiz = request.body;
                var autoGen = new autoid_generator_1.AutoIDGenerator("YT.quiz");
                createdQuiz.id = autoGen.GetAutoID();
                quizs.push(createdQuiz);
                console.log(createdQuiz);
                localStorage.setItem('quizs', JSON.stringify(quizs));
                // respond 200 OK
                return rxjs_1.of(new http_1.HttpResponse({ status: 200 }));
            }
            // update the quiz by quiz id
            if (request.url.indexOf('/quizzes/Update') > 0) {
                console.log('update local quiz data...');
                var segment = request.url.split('/');
                var id = Number(segment[segment.length - 1]);
                console.log(id);
                // get updated quiz object from post body
                var updatedQuiz = request.body;
                //var quiz = quizs.filter(quiz => {return quiz.id === id})[0]; 
                var idx = quizs.findIndex(function (quiz) { return quiz.id === id; });
                //update it  
                quizs[idx] = updatedQuiz;
                //console.log(quiz);
                localStorage.setItem('quizs', JSON.stringify(quizs));
                // respond 200 OK
                return rxjs_1.of(new http_1.HttpResponse({ status: 200 }));
            }
            // get a list of category
            if (request.url.endsWith('/Categories/GetCategories')) {
                console.log('using local category data...');
                var categories = catlist;
                return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: categories }));
            }
            // get a list of quiz
            if (request.url.endsWith('/quizzes/getQuizList')) {
                console.log('using local quiz data...');
                return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: quizs }));
            }
            // get a quiz
            if (request.url.indexOf('/quizzes/getQuiz') > 0) {
                console.log('using local quiz data for an id...');
                var segment = request.url.split('/');
                var id = Number(segment[segment.length - 1]);
                //var id:string = segment[segment.length - 1];
                console.log(id);
                //var quiz = quizs.filter(function(item) {return item.id === id})[0];
                var quiz = quizs.filter(function (quiz) { return quiz.id === id; })[0];
                console.log(quiz);
                return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: quiz }));
            }
            //quizzes/getManageQuizQuestions
            // get a quiz questions
            if (request.url.indexOf('/quizzes/getManageQuizQuestions') > 0) {
                console.log('using local quiz question data for an id...');
                var questions;
                var segment2 = request.url.split('/');
                console.log(request.url);
                console.log(segment2.length);
                console.log(segment2[segment2.length - 1]);
                var id = Number(segment2[segment2.length - 1]);
                console.log(id);
                var quiz = quizs.filter(function (quiz) { return quiz.id === id; })[0];
                if (quiz.questions === undefined || quiz.questions === null || quiz.questions.length === 0 > 0) {
                    //load questions from a fie
                    console.log("loading local question data...");
                    var _localFileURL = '../../assets/question-quiz-' + id.toString() + '.json';
                    console.log(_localFileURL);
                    if (id == 3) {
                        questions = qq3; // require(_localFileURL);
                    }
                    else if (id == 5) {
                        questions = qq5;
                    }
                }
                else {
                    questions = quiz.questions;
                }
                console.log(questions);
                return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: questions }));
            }
            //below are from the sample
            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                var filteredUsers = users.filter(function (user) {
                    return user.username === request.body.username && user.password === request.body.password;
                });
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    var user = filteredUsers[0];
                    var body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };
                    return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: body }));
                }
                else {
                    // else return 400 bad request
                    return rxjs_1.throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }
            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: users }));
                }
                else {
                    // return 401 not authorised if token is null or invalid
                    return rxjs_1.throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    var urlParts = request.url.split('/');
                    var id_1 = parseInt(urlParts[urlParts.length - 1]);
                    var matchedUsers = users.filter(function (user) { return user.id === id_1; });
                    var user = matchedUsers.length ? matchedUsers[0] : null;
                    return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: user }));
                }
                else {
                    // return 401 not authorised if token is null or invalid
                    return rxjs_1.throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                var newUser_1 = request.body;
                // validation
                var duplicateUser = users.filter(function (user) { return user.username === newUser_1.username; }).length;
                if (duplicateUser) {
                    return rxjs_1.throwError({ error: { message: 'Username "' + newUser_1.username + '" is already taken' } });
                }
                // save new user
                newUser_1.id = users.length + 1;
                users.push(newUser_1);
                localStorage.setItem('users', JSON.stringify(users));
                // respond 200 OK
                return rxjs_1.of(new http_1.HttpResponse({ status: 200 }));
            }
            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    var urlParts = request.url.split('/');
                    var id_2 = parseInt(urlParts[urlParts.length - 1]);
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.id === id_2) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }
                    // respond 200 OK
                    return rxjs_1.of(new http_1.HttpResponse({ status: 200 }));
                }
                else {
                    // return 401 not authorised if token is null or invalid
                    return rxjs_1.throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            // pass through any requests not handled above
            return next.handle(request);
        }))
            .pipe(operators_1.materialize())
            .pipe(operators_1.delay(500))
            .pipe(operators_1.dematerialize());
    };
    FakeBackendInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FakeBackendInterceptor);
    return FakeBackendInterceptor;
}());
exports.FakeBackendInterceptor = FakeBackendInterceptor;
exports.fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: http_1.HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};


/***/ }),

/***/ "./src/app/_layout/site-layout/site-layout.component.css":
/*!***************************************************************!*\
  !*** ./src/app/_layout/site-layout/site-layout.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/_layout/site-layout/site-layout.component.html":
/*!****************************************************************!*\
  !*** ./src/app/_layout/site-layout/site-layout.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav-bar></nav-bar>\n<h1>This is the Site Layout!!!</h1>\n<router-outlet></router-outlet>\n<!--<site-footer></site-footer>-->"

/***/ }),

/***/ "./src/app/_layout/site-layout/site-layout.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/_layout/site-layout/site-layout.component.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var SiteLayoutComponent = /** @class */ (function () {
    function SiteLayoutComponent() {
    }
    SiteLayoutComponent.prototype.ngOnInit = function () {
    };
    SiteLayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-site-layout',
            template: __webpack_require__(/*! ./site-layout.component.html */ "./src/app/_layout/site-layout/site-layout.component.html"),
            styles: [__webpack_require__(/*! ./site-layout.component.css */ "./src/app/_layout/site-layout/site-layout.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SiteLayoutComponent);
    return SiteLayoutComponent;
}());
exports.SiteLayoutComponent = SiteLayoutComponent;


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var solve_quiz_component_1 = __webpack_require__(/*! ./quiz/solve-quiz.component */ "./src/app/quiz/solve-quiz.component.ts");
var quiz_edit_component_1 = __webpack_require__(/*! ./quiz/quiz-edit.component */ "./src/app/quiz/quiz-edit.component.ts");
var quiz_edit_info_component_1 = __webpack_require__(/*! ./quiz/quiz-edit-info.component */ "./src/app/quiz/quiz-edit-info.component.ts");
var quiz_edit_tags_component_1 = __webpack_require__(/*! ./quiz/quiz-edit-tags.component */ "./src/app/quiz/quiz-edit-tags.component.ts");
var quiz_list_component_1 = __webpack_require__(/*! ./quiz/quiz-list.component */ "./src/app/quiz/quiz-list.component.ts");
var quiz_resolver_service_1 = __webpack_require__(/*! ./quiz/quiz-resolver.service */ "./src/app/quiz/quiz-resolver.service.ts");
var login_component_1 = __webpack_require__(/*! ./user/login.component */ "./src/app/user/login.component.ts");
var page_not_found_component_1 = __webpack_require__(/*! ./page-not-found.component */ "./src/app/page-not-found.component.ts");
var quiz_result_component_1 = __webpack_require__(/*! ./quiz/quiz-result.component */ "./src/app/quiz/quiz-result.component.ts");
var quiz_guard_service_1 = __webpack_require__(/*! ./quiz/quiz-guard.service */ "./src/app/quiz/quiz-guard.service.ts");
var take_quiz_component_1 = __webpack_require__(/*! ./quiz/take-quiz.component */ "./src/app/quiz/take-quiz.component.ts");
var make_quiz_component_1 = __webpack_require__(/*! ./quiz/make-quiz.component */ "./src/app/quiz/make-quiz.component.ts");
var site_layout_component_1 = __webpack_require__(/*! ./_layout/site-layout/site-layout.component */ "./src/app/_layout/site-layout/site-layout.component.ts");
var routes = [
    //{ path: 'login', component: LoginComponent },
    {
        path: '', component: site_layout_component_1.SiteLayoutComponent,
        children: [
            //{ path: '', redirectTo: '/quizs', pathMatch: 'full' },
            { path: 'quizs', component: quiz_list_component_1.QuizListComponent,
                children: [
                    {
                        path: ':id',
                        component: solve_quiz_component_1.SolveQuizComponent,
                        resolve: { quiz: quiz_resolver_service_1.QuizResolver },
                    },
                    {
                        path: ':id/edit',
                        component: quiz_edit_component_1.QuizEditComponent,
                        canDeactivate: [quiz_guard_service_1.QuizEditGuard],
                        resolve: { quiz: quiz_resolver_service_1.QuizResolver },
                        children: [
                            { path: '', redirectTo: 'info', pathMatch: 'full' },
                            { path: 'info', component: quiz_edit_info_component_1.QuizEditInfoComponent },
                            { path: 'tags', component: quiz_edit_tags_component_1.QuizEditTagsComponent }
                        ]
                    },
                ]
            },
            {
                path: 'quizs:id/result',
                component: quiz_result_component_1.QuizResultComponent,
                //canDeactivate: [ProductEditGuard],
                children: [
                    { path: '', redirectTo: '/quizs:id/result', pathMatch: 'full' },
                    {
                        path: ':sid',
                        component: quiz_result_component_1.QuizResultComponent,
                    },
                ]
            },
        ]
    },
    {
        path: 'admin/quizs', component: quiz_edit_component_1.QuizEditComponent,
        children: [
            {
                path: ':id/edit',
                component: quiz_edit_component_1.QuizEditComponent,
                canDeactivate: [quiz_guard_service_1.QuizEditGuard],
                resolve: { quiz: quiz_resolver_service_1.QuizResolver },
                children: [
                    { path: '', redirectTo: 'info', pathMatch: 'full' },
                    { path: 'info', component: quiz_edit_info_component_1.QuizEditInfoComponent },
                    { path: 'tags', component: quiz_edit_tags_component_1.QuizEditTagsComponent }
                ]
            },
        ]
    },
    {
        path: 'editquiz/:id/make/:uid', component: make_quiz_component_1.MakeQuizComponent,
        resolve: { quiz: quiz_resolver_service_1.QuizResolver },
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: quiz_edit_info_component_1.QuizEditInfoComponent },
            { path: 'tags', component: quiz_edit_tags_component_1.QuizEditTagsComponent }
        ]
    },
    {
        //path: '', component: TakeQuizLayoutComponent
        path: 'solvequiz/:id/take/:uid', component: take_quiz_component_1.TakeQuizComponent,
    },
    { path: 'user', loadChildren: '/Scripts/user/user.module#UserModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.routableComponents = [
    //SkillListComponent,
    //SkillComponent,
    //CoderListComponent,
    //    CoderComponent,
    login_component_1.LoginComponent,
    page_not_found_component_1.PageNotFoundComponent,
    solve_quiz_component_1.SolveQuizComponent,
    take_quiz_component_1.TakeQuizComponent,
];


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var auth_service_1 = __webpack_require__(/*! ./user/auth.service */ "./src/app/user/auth.service.ts");
var http_1 = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
//import { MessageService } from './messages/message.service';
var http_2 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var core_2 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, auth, activatedRoute, _http) {
        var _this = this;
        this.router = router;
        this.auth = auth;
        this.activatedRoute = activatedRoute;
        this._http = _http;
        this.pageTitle = 'Quiz Management';
        this.loading = true;
        router.events.subscribe(function (routerEvent) {
            _this.checkRouterEvent(routerEvent);
            if (routerEvent instanceof router_1.NavigationStart) {
                var params = new http_1.URLSearchParams(routerEvent.url.split('?')[1]);
                //let id = params['id'];
                var id = params.get('id');
                var act = params.get('act');
                var userId = params.get('uid');
                console.log("id in qs in constructor " + id);
                console.log("act in qs in constructor " + act);
                console.log("uid in qs in constructor " + userId);
                // Cache the user id in session storage.
                localStorage.setItem("myUserId", JSON.stringify(userId));
                var userId2 = JSON.parse(localStorage.getItem('myUserId'));
                console.log("uid in localStorage in constructor " + userId2);
                if (id != "" && act == 'take') {
                    router.navigate(['/solvequiz', id, act, userId2], { skipLocationChange: true });
                    //router.navigate(['solvequiz', id], { relativeTo: this.activatedRoute, skipLocationChange: true });
                    //router.navigateByUrl('/solvequiz', id);
                }
                else if (id != "" && act == "make") {
                    router.navigate(['/editquiz', id, act, userId2], { skipLocationChange: false });
                }
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("ngOnInit in app component");
        //this.auth.checkAuthenticationStatus();
        //document.dispatchEvent(.dispatchEvent(elementRef.nativeElement, new CustomEvent('angular-ready'));
        // subscribe to router event
        this.activatedRoute.params.subscribe(function (params) {
            var id = params['id'];
            console.log("id in qs " + id);
        });
        //if quizs is empty, load it from the local json file
        console.log("loading local quiz data...");
        var _localQuizsURL = '../assets/quizs.json';
        this._http.get(_localQuizsURL).subscribe(function (data) {
            console.log('data from local file:');
            console.log(JSON.stringify(data));
            localStorage.setItem('quizs', JSON.stringify(data));
        }, function (err) {
            console.log(err.message);
        });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        //var userName: string = "admin";
        //var password: string = "123456";
        //console.log("call login...");
        //var loginOK: boolean;
        //this.auth.login(userName, password).subscribe(resp => {
        //    if (!resp) {
        //        loginOK = false;
        //    } else {
        //        loginOK = true;
        //    }
        //});
        //console.log(loginOK);
        //console.log("after call login...");
    };
    AppComponent.prototype.checkRouterEvent = function (routerEvent) {
        if (routerEvent instanceof router_1.NavigationStart) {
            this.loading = true;
        }
        if (routerEvent instanceof router_1.NavigationEnd ||
            routerEvent instanceof router_1.NavigationCancel ||
            routerEvent instanceof router_1.NavigationError) {
            this.loading = false;
        }
    };
    AppComponent.prototype.displayMessages = function () {
        this.router.navigate([{ outlets: { popup: ['messages'] } }]);
        //this.messageService.isDisplayed = true;
    };
    AppComponent.prototype.hideMessages = function () {
        this.router.navigate([{ outlets: { popup: null } }]);
        //this.messageService.isDisplayed = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: __webpack_require__(/*! ./template/app.component.html */ "./src/app/template/app.component.html")
        }),
        core_2.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService, router_1.ActivatedRoute, http_2.HttpClient])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
__webpack_require__(/*! ./rxjs-extensions */ "./src/app/rxjs-extensions.ts");
// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
var quiz_service_1 = __webpack_require__(/*! ./quiz/quiz.service */ "./src/app/quiz/quiz.service.ts");
var question_service_1 = __webpack_require__(/*! ./quiz/question.service */ "./src/app/quiz/question.service.ts");
var quiz_eval_service_1 = __webpack_require__(/*! ./quiz/quiz-eval.service */ "./src/app/quiz/quiz-eval.service.ts");
var quiz_resolver_service_1 = __webpack_require__(/*! ./quiz/quiz-resolver.service */ "./src/app/quiz/quiz-resolver.service.ts");
var app_routing_module_1 = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
var app_component_1 = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var navbar_component_1 = __webpack_require__(/*! ./nav/navbar.component */ "./src/app/nav/navbar.component.ts");
var quiz_list_component_1 = __webpack_require__(/*! ./quiz/quiz-list.component */ "./src/app/quiz/quiz-list.component.ts");
var quiz_edit_component_1 = __webpack_require__(/*! ./quiz/quiz-edit.component */ "./src/app/quiz/quiz-edit.component.ts");
var quiz_edit_info_component_1 = __webpack_require__(/*! ./quiz/quiz-edit-info.component */ "./src/app/quiz/quiz-edit-info.component.ts");
var quiz_edit_tags_component_1 = __webpack_require__(/*! ./quiz/quiz-edit-tags.component */ "./src/app/quiz/quiz-edit-tags.component.ts");
var solve_quiz_component_1 = __webpack_require__(/*! ./quiz/solve-quiz.component */ "./src/app/quiz/solve-quiz.component.ts");
var quiz_result_component_1 = __webpack_require__(/*! ./quiz/quiz-result.component */ "./src/app/quiz/quiz-result.component.ts");
var make_quiz_component_1 = __webpack_require__(/*! ./quiz/make-quiz.component */ "./src/app/quiz/make-quiz.component.ts");
var take_quiz_component_1 = __webpack_require__(/*! ./quiz/take-quiz.component */ "./src/app/quiz/take-quiz.component.ts");
//import { LogoutComponent } from './user/logout.component';
var question_edit_component_1 = __webpack_require__(/*! ./quiz/question-edit.component */ "./src/app/quiz/question-edit.component.ts");
var question_list_component_1 = __webpack_require__(/*! ./quiz/question-list.component */ "./src/app/quiz/question-list.component.ts");
var quiz_guard_service_1 = __webpack_require__(/*! ./quiz/quiz-guard.service */ "./src/app/quiz/quiz-guard.service.ts");
var site_layout_component_1 = __webpack_require__(/*! ./_layout/site-layout/site-layout.component */ "./src/app/_layout/site-layout/site-layout.component.ts");
var page_not_found_component_1 = __webpack_require__(/*! ./page-not-found.component */ "./src/app/page-not-found.component.ts");
var ng_bootstrap_1 = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
//import { NgbdPaginationBasic } from './quiz/pagination-basic';
var progressbar_showvalue_1 = __webpack_require__(/*! ./quiz/progressbar-showvalue */ "./src/app/quiz/progressbar-showvalue.ts");
//import { NgbdTypeaheadFormat } from './quiz/typeahead-format';
var modal_basic_1 = __webpack_require__(/*! ./quiz/modal-basic */ "./src/app/quiz/modal-basic.ts");
var category_service_1 = __webpack_require__(/*! ./quiz/category.service */ "./src/app/quiz/category.service.ts");
var focused_input_directive_1 = __webpack_require__(/*! ./shared/focused-input.directive */ "./src/app/shared/focused-input.directive.ts");
/* Feature Modules */
//import { UserModule } from './user/user.module';
var message_module_1 = __webpack_require__(/*! ./messages/message.module */ "./src/app/messages/message.module.ts");
var shared_service_1 = __webpack_require__(/*! ./shared/shared-service */ "./src/app/shared/shared-service.ts");
var auth_service_1 = __webpack_require__(/*! ./user/auth.service */ "./src/app/user/auth.service.ts");
var toastr_service_1 = __webpack_require__(/*! ./shared/toastr.service */ "./src/app/shared/toastr.service.ts");
//test
//import { SkillListComponent } from './skill/skill-list.component';
//import { SkillComponent } from './skill/skill.component';
// used to create fake backend
var fake_backend_1 = __webpack_require__(/*! ./_helpers/fake-backend */ "./src/app/_helpers/fake-backend.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                message_module_1.MessageModule,
                forms_1.FormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                navbar_component_1.NavBarComponent,
                quiz_list_component_1.QuizListComponent,
                solve_quiz_component_1.SolveQuizComponent,
                make_quiz_component_1.MakeQuizComponent,
                take_quiz_component_1.TakeQuizComponent,
                quiz_edit_component_1.QuizEditComponent,
                quiz_edit_info_component_1.QuizEditInfoComponent,
                quiz_edit_tags_component_1.QuizEditTagsComponent,
                quiz_result_component_1.QuizResultComponent,
                question_edit_component_1.QuestionEditComponent,
                question_list_component_1.QuestionListComponent,
                site_layout_component_1.SiteLayoutComponent,
                page_not_found_component_1.PageNotFoundComponent,
                progressbar_showvalue_1.NgbdProgressbarShowvalue,
                modal_basic_1.NgbdModalBasic,
                focused_input_directive_1.FocusedInputDirective,
            ],
            providers: [quiz_service_1.QuizService, question_service_1.QuestionService, quiz_eval_service_1.QuizEvalService, category_service_1.CategoryService, quiz_resolver_service_1.QuizResolver, quiz_guard_service_1.QuizEditGuard, shared_service_1.SharedService,
                { provide: toastr_service_1.TOASTR_TOKEN, useValue: toastr },
                auth_service_1.AuthService,
                {
                    provide: 'canDeactivateCreateEvent',
                    useValue: checkDirtyState
                },
                // provider used to create fake backend
                fake_backend_1.fakeBackendProvider
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
function checkDirtyState(component) {
    if (component.isDirty)
        return window.confirm('You have not saved this event, Do you really want to cancel?');
    return true;
}


/***/ }),

/***/ "./src/app/config.ts":
/*!***************************!*\
  !*** ./src/app/config.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = {
    baseUrls: {
        skills: '/scripts/api/skills.json',
        coders: '/scripts/api/coders.json',
        quizs: '/api/quizzes/getQuizList',
        quiz: '/api/quizzes/getQuiz',
        questions: '/api/quizzes/getQuizQuestions',
        manageQuestions: '/api/quizzes/getManageQuizQuestions',
        quizEval: '/api/quizzes/getQuizEvaluation',
        quizCreate: '/api/quizzes/Create',
        quizUpdate: '/api/quizzes/Update',
        quizSolve: '/api/quizzes/Solve',
        categories: '/api/Categories/GetCategories',
    }
};


/***/ }),

/***/ "./src/app/messages/message.component.ts":
/*!***********************************************!*\
  !*** ./src/app/messages/message.component.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var message_service_1 = __webpack_require__(/*! ../messages/message.service */ "./src/app/messages/message.service.ts");
var MessageComponent = /** @class */ (function () {
    function MessageComponent(messageService, router) {
        this.messageService = messageService;
        this.router = router;
    }
    MessageComponent.prototype.close = function () {
        // Close the popup.
        this.router.navigate([{ outlets: { popup: null } }]);
        this.messageService.isDisplayed = false;
    };
    MessageComponent = __decorate([
        core_1.Component({
            template: "\n        <div class=\"row\">\n            <h4 class=\"col-md-10\">Message Log</h4>\n            <span class=\"col-md-2\">\n                <a class=\"btn btn-default\"\n                    (click)=\"close()\">\n                    x\n                </a>\n            </span>\n        </div>\n        <div *ngFor=\"let message of messageService.messages; let i=index\">\n            <div *ngIf=\"i<10\" class=\"message-row\">\n                {{ message }}\n            </div>\n        </div>\n    ",
            styles: [
                '.message-row { margin-bottom: 10px }'
            ]
        }),
        __metadata("design:paramtypes", [message_service_1.MessageService,
            router_1.Router])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;


/***/ }),

/***/ "./src/app/messages/message.module.ts":
/*!********************************************!*\
  !*** ./src/app/messages/message.module.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var shared_module_1 = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var message_component_1 = __webpack_require__(/*! ./message.component */ "./src/app/messages/message.component.ts");
var message_service_1 = __webpack_require__(/*! ./message.service */ "./src/app/messages/message.service.ts");
var MessageModule = /** @class */ (function () {
    function MessageModule() {
    }
    MessageModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild([
                    {
                        path: 'messages',
                        component: message_component_1.MessageComponent,
                        outlet: 'popup'
                    }
                ])
            ],
            declarations: [
                message_component_1.MessageComponent
            ],
            providers: [
                message_service_1.MessageService
            ]
        })
    ], MessageModule);
    return MessageModule;
}());
exports.MessageModule = MessageModule;


/***/ }),

/***/ "./src/app/messages/message.service.ts":
/*!*********************************************!*\
  !*** ./src/app/messages/message.service.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var MessageService = /** @class */ (function () {
    function MessageService() {
        this.messages = [];
        this.isDisplayed = false;
    }
    MessageService.prototype.addMessage = function (message) {
        var currentDate = new Date();
        this.messages.unshift(message + ' at ' + currentDate.toLocaleString());
    };
    MessageService = __decorate([
        core_1.Injectable()
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;


/***/ }),

/***/ "./src/app/nav/navbar.component.html":
/*!*******************************************!*\
  !*** ./src/app/nav/navbar.component.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"wrapper\">\r\n    <div id=\"logo\">\r\n        <img src=\"/src/assets/images/logo.png\" alt=\"logo\">\r\n    </div>\r\n\r\n    <nav class=\"navbar navbar-inverse\">\r\n        <div class=\"container-fluid nav-container\">\r\n\r\n            <div class=\"navbar-header\">\r\n                <button data-toggle=\"collapse\" data-target=\"#main-nav\" aria-expanded=\"false\" class=\"navbar-toggle collapsed\">\r\n                    <span class=\"sr-only\">Toggle navigation</span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                </button>\r\n            </div>\r\n            <div id=\"main-nav\" aria-expanded=\"false\" style=\"height: 0.8px;\" class=\"navbar-collapse collapse\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li>\r\n                        <a [routerLink]=\"['/quizs']\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact:true}\">All Quizs</a>\r\n                    </li>\r\n                    <li routerLinkActive=\"active\">\r\n                        <a [routerLink]=\"['/quizs', 0, 'edit']\">Add Quiz</a>\r\n                    </li>\r\n                    <li routerLinkActive=\"active\">\r\n                        <a [routerLink]=\"['/solvequiz', 1, 'take', 10]\">Solve Quiz</a>\r\n                    </li>\r\n                    <!--<li><a [routerLink]=\"['/events/new']\" routerLinkActive=\"active\">Create Event</a></li>-->\r\n                    <li class=\"dropdown\">\r\n                        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                            Events\r\n                            <span class=\"caret\"></span>\r\n                        </a>\r\n                        <ul class=\"dropdown-menu\">\r\n                            <li>\r\n                                <a href=\"\">Angular Connect</a>\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                </ul>\r\n           \r\n                <ul class=\"nav navbar-nav navbar-right\">\r\n                    <li>\r\n                        <a [hidden]=\"!auth.isAuthenticated()\" [routerLink]=\"['user/profile']\">Welcome {{auth.currentUser?.firstName}}</a>\r\n                    </li>\r\n                    <li>\r\n                        <a [hidden]=\"auth.isAuthenticated()\" [routerLink]=\"['user/login']\">Login</a>\r\n                        <a [hidden]=\"!auth.isAuthenticated()\" style=\"cursor: pointer\" (click)=\"logout()\">Logout</a>\r\n                    </li>\r\n                    \r\n                </ul>\r\n            </div>\r\n          </div>\r\n    </nav>\r\n</header>\r\n"

/***/ }),

/***/ "./src/app/nav/navbar.component.ts":
/*!*****************************************!*\
  !*** ./src/app/nav/navbar.component.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var auth_service_1 = __webpack_require__(/*! ../user/auth.service */ "./src/app/user/auth.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var NavBarComponent = /** @class */ (function () {
    function NavBarComponent(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    NavBarComponent.prototype.logout = function () {
        this.auth.logout();
        this.router.navigateByUrl('/user/logout');
    };
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'nav-bar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/nav/navbar.component.html"),
            styles: ["\n    .nav.navbar-nav {font-size:15px} \n    #searchForm {margin-right:100px; } \n    @media (max-width: 1200px) {#searchForm {display:none}}\n    li > a.active { color: #F97924; }\n    [hidden] { display: none !important;}\n  "],
        }),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;


/***/ }),

/***/ "./src/app/page-not-found.component.ts":
/*!*********************************************!*\
  !*** ./src/app/page-not-found.component.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent = __decorate([
        core_1.Component({
            moduleId: module.i,
            template: "\n    <article class=\"template animated slideInRight\">\n      <h4>Inconceivable!</h4>\n      <div>I do not think this page is where you think it is.</div>\n    </article>\n  "
        })
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());
exports.PageNotFoundComponent = PageNotFoundComponent;


/***/ }),

/***/ "./src/app/quiz/category.service.ts":
/*!******************************************!*\
  !*** ./src/app/quiz/category.service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///api/quizzes/GetQuizCategories
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var config_1 = __webpack_require__(/*! ../config */ "./src/app/config.ts");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var categoriesUrl = config_1.CONFIG.baseUrls.categories;
var CategoryService = /** @class */ (function () {
    function CategoryService(http) {
        this.http = http;
    }
    CategoryService.prototype.getCategories = function () {
        console.log("getCategories...");
        return this.http
            .get(categoriesUrl)
            .pipe(operators_1.map(function (res) { return res; }));
    };
    CategoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CategoryService);
    return CategoryService;
}());
exports.CategoryService = CategoryService;


/***/ }),

/***/ "./src/app/quiz/css/bookblock.css":
/*!****************************************!*\
  !*** ./src/app/quiz/css/bookblock.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bb-bookblock {\n\twidth: 400px;\n\theight: 300px;\n\tmargin: 0 auto;\n\tposition: relative;\n\tz-index: 9999;\n\t-webkit-perspective: 1300px;\n\tperspective: 1300px;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\n.bb-page {\n\tposition: absolute;\n\t-webkit-transform-style: preserve-3d;\n\ttransform-style: preserve-3d;\n\ttransition-property: -webkit-transform;\n\ttransition-property: transform;\n\ttransition-property: transform, -webkit-transform;\n}\n\n.bb-vertical .bb-page {\n\twidth: 50%;\n\theight: 100%;\n\tleft: 50%;\n\t-webkit-transform-origin: left center;\n\ttransform-origin: left center;\n}\n\n.bb-horizontal .bb-page {\n\twidth: 100%;\n\theight: 50%;\n\ttop: 50%;\n\t-webkit-transform-origin: center top;\n\ttransform-origin: center top;\n}\n\n.bb-page > div,\n.bb-outer,\n.bb-content,\n.bb-inner {\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\ttop: 0;\n\tleft: 0;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\n.bb-vertical .bb-content {\n\twidth: 200%;\n}\n\n.bb-horizontal .bb-content {\n\theight: 200%;\n}\n\n.bb-page > div {\n\twidth: 100%;\n\t-webkit-transform-style: preserve-3d;\n\ttransform-style: preserve-3d;\n}\n\n.bb-vertical .bb-back {\n\t-webkit-transform: rotateY(-180deg);\n\ttransform: rotateY(-180deg);\n}\n\n.bb-horizontal .bb-back {\n\t-webkit-transform: rotateX(-180deg);\n\ttransform: rotateX(-180deg);\n}\n\n.bb-outer {\n\twidth: 100%;\n\toverflow: hidden;\n\tz-index: 999;\n}\n\n.bb-overlay, \n.bb-flipoverlay {\n\tbackground-color: rgba(0, 0, 0, 0.7);\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\topacity: 0;\n}\n\n.bb-flipoverlay {\n\tbackground-color: rgba(0, 0, 0, 0.2);\n}\n\n.bb-bookblock.bb-vertical > div.bb-page:first-child,\n.bb-bookblock.bb-vertical > div.bb-page:first-child .bb-back {\n\t-webkit-transform: rotateY(180deg);\n\ttransform: rotateY(180deg);\n}\n\n.bb-bookblock.bb-horizontal > div.bb-page:first-child,\n.bb-bookblock.bb-horizontal > div.bb-page:first-child .bb-back {\n\t-webkit-transform: rotateX(180deg);\n\ttransform: rotateX(180deg);\n}\n\n/* Content display */\n\n.bb-content {\n\tbackground: #fff;\n}\n\n.bb-vertical .bb-front .bb-content {\n\tleft: -100%;\n}\n\n.bb-horizontal .bb-front .bb-content {\n\ttop: -100%;\n}\n\n/* Flipping classes */\n\n.bb-vertical .bb-flip-next,\n.bb-vertical .bb-flip-initial {\n\t-webkit-transform: rotateY(-180deg);\n\ttransform: rotateY(-180deg);\n}\n\n.bb-vertical .bb-flip-prev {\n\t-webkit-transform: rotateY(0deg);\n\ttransform: rotateY(0deg);\n}\n\n.bb-horizontal .bb-flip-next,\n.bb-horizontal .bb-flip-initial {\n\t-webkit-transform: rotateX(180deg);\n\ttransform: rotateX(180deg);\n}\n\n.bb-horizontal .bb-flip-prev {\n\t-webkit-transform: rotateX(0deg);\n\ttransform: rotateX(0deg);\n}\n\n.bb-vertical .bb-flip-next-end {\n\t-webkit-transform: rotateY(-15deg);\n\ttransform: rotateY(-15deg);\n}\n\n.bb-vertical .bb-flip-prev-end {\n\t-webkit-transform: rotateY(-165deg);\n\ttransform: rotateY(-165deg);\n}\n\n.bb-horizontal .bb-flip-next-end {\n\t-webkit-transform: rotateX(15deg);\n\ttransform: rotateX(15deg);\n}\n\n.bb-horizontal .bb-flip-prev-end {\n\t-webkit-transform: rotateX(165deg);\n\ttransform: rotateX(165deg);\n}\n\n.bb-item {\n\twidth: 100%;\n\theight: 100%;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tdisplay: none;\n\tbackground: #ccc;\n}\n\n/* No JS */\n\n.no-js .bb-bookblock, \n.no-js ul.bb-custom-grid li {\n\twidth: auto;\n\theight: auto;\n}\n\n.no-js .bb-item {\n\tdisplay: block;\n\tposition: relative;\n}"

/***/ }),

/***/ "./src/app/quiz/css/question-edit.component.css":
/*!******************************************************!*\
  !*** ./src/app/quiz/css/question-edit.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n"

/***/ }),

/***/ "./src/app/quiz/css/question-list.component.css":
/*!******************************************************!*\
  !*** ./src/app/quiz/css/question-list.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n"

/***/ }),

/***/ "./src/app/quiz/css/quiz-edit-tags.component.css":
/*!*******************************************************!*\
  !*** ./src/app/quiz/css/quiz-edit-tags.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".btn-default {\r\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc;\r\n}\r\n"

/***/ }),

/***/ "./src/app/quiz/css/quiz-edit.component.css":
/*!**************************************************!*\
  !*** ./src/app/quiz/css/quiz-edit.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".glyphicon-exclamation-sign {\r\n    color: red;\r\n}\r\n\r\n.wizard a {\r\n    background: #efefef;\r\n    display: inline-block;\r\n    margin-right: 5px;\r\n    min-width: 150px;\r\n    outline: none;\r\n    padding: 10px 40px 10px;\r\n    position: relative;\r\n    text-decoration: none;\r\n}\r\n\r\n.wizard a:hover {\r\n    cursor: pointer;\r\n    text-decoration: underline;\r\n}\r\n\r\n/* Adds the cut out on the left side of the tab */\r\n\r\n.wizard a:before {\r\n    width: 0;\r\n    height: 0;\r\n    border-top: 20px inset transparent;\r\n    border-bottom: 20px inset transparent;\r\n    border-left: 20px solid #fff;\r\n    position: absolute;\r\n    content: \"\";\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n/* Adds the arrow on the right side of the tab */\r\n\r\n.wizard a:after {\r\n    width: 0;\r\n    height: 0;\r\n    border-top: 20px inset transparent;\r\n    border-bottom: 20px inset transparent;\r\n    border-left: 21px solid #efefef;\r\n    position: absolute;\r\n    content: \"\";\r\n    top: 0;\r\n    right: -20px;\r\n    z-index: 2;\r\n}\r\n\r\n/* Squares the start and end of the tab bar */\r\n\r\n.wizard a:first-child:before,\r\n.wizard a:last-child:after {\r\n    border: none;\r\n}\r\n\r\n/* Rounds the corners */\r\n\r\n.wizard a:first-child {\r\n    border-radius: 8px 0 0 0px;\r\n}\r\n\r\n.wizard a:last-child {\r\n    border-radius: 0 8px 0px 0;\r\n}\r\n\r\n.wizard .active {\r\n    background: #007ACC;\r\n    color: #fff;\r\n}\r\n\r\n/* Adds the right arrow after the tab */\r\n\r\n.wizard .active:after {\r\n    border-left-color: #007ACC;\r\n}\r\n\r\na.btn-default {\r\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc;\r\n}\r\n"

/***/ }),

/***/ "./src/app/quiz/css/quiz-result.component.css":
/*!****************************************************!*\
  !*** ./src/app/quiz/css/quiz-result.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1, h2 {\r\n    color: white;\r\n}\r\n"

/***/ }),

/***/ "./src/app/quiz/css/solve-quiz.component.css":
/*!***************************************************!*\
  !*** ./src/app/quiz/css/solve-quiz.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".answered {\n    color: white;\n    background-color: #1C232B;\n}\n\nspan.selected {\n    text-decoration: underline;\n    font-weight: bold;\n    /*background-color: red;*/\n}\n\n.slide-title {\n  z-index: 10;\n  position: relative;\n  width: 100%;\n  max-height: 8rem;\n  margin: 0;\n  text-align: center;\n  color: #fff;\n  border-left: 1px solid #fff;\n  padding: 1.5rem 1rem;\n  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.62), #1F272F 90%);\n}\n\n/*.slide-title::before,\n.slide-title::after {\n  z-index: 5;\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 1px;\n  background-image: -webkit-linear-gradient(right, transparent, rgba(255, 255, 255, 0.5));\n  background-image: -moz-linear-gradient(right, transparent, rgba(255, 255, 255, 0.5));\n  background-image: -ms-linear-gradient(right, transparent, rgba(255, 255, 255, 0.5));\n  background-image: -o-linear-gradient(right, transparent, rgba(255, 255, 255, 0.5));\n  background-image: linear-gradient(right, transparent, rgba(255, 255, 255, 0.5));\n}*/\n\n.slide-title::before {\n  top: 0;\n  width: 100%;\n  background-image: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.5));\n}\n\n.slide-title::after {\n  right: 0;\n  bottom: 0;\n}\n"

/***/ }),

/***/ "./src/app/quiz/make-quiz.component.ts":
/*!*********************************************!*\
  !*** ./src/app/quiz/make-quiz.component.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var quiz_service_1 = __webpack_require__(/*! ./quiz.service */ "./src/app/quiz/quiz.service.ts");
var question_service_1 = __webpack_require__(/*! ./question.service */ "./src/app/quiz/question.service.ts");
var message_service_1 = __webpack_require__(/*! ../messages/message.service */ "./src/app/messages/message.service.ts");
var shared_service_1 = __webpack_require__(/*! ../shared/shared-service */ "./src/app/shared/shared-service.ts");
var MakeQuizComponent = /** @class */ (function () {
    function MakeQuizComponent(quizService, questionService, messageService, sharedService, route, router) {
        this.quizService = quizService;
        this.questionService = questionService;
        this.messageService = messageService;
        this.sharedService = sharedService;
        this.route = route;
        this.router = router;
        this.savedQuiz = new core_1.EventEmitter();
        this.pageTitle = 'Quiz Edit';
        this.dataIsValid = {};
    }
    Object.defineProperty(MakeQuizComponent.prototype, "quiz", {
        get: function () {
            return this.currentQuiz;
        },
        set: function (value) {
            this.currentQuiz = value;
            // Clone the object to retain a copy
            this.originalQuiz = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MakeQuizComponent.prototype, "isDirty", {
        get: function () {
            return JSON.stringify(this.originalQuiz) !== JSON.stringify(this.currentQuiz);
        },
        enumerable: true,
        configurable: true
    });
    MakeQuizComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.userId = params['uid'];
            console.log("user id from params");
            console.log(_this.userId);
        });
        //retrive the data that is provided by the resoler
        this.route.data.subscribe(function (data) {
            _this.onQuizRetrieved(data['quiz']);
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
    };
    MakeQuizComponent.prototype.quizClick = function (Quiz) {
        console.log("quizClick=" + Quiz);
        this.quiz = Quiz;
    };
    MakeQuizComponent.prototype.onQuizRetrieved = function (Quiz) {
        var _this = this;
        this.quiz = Quiz;
        if (this.quiz.id === 0) {
            this.pageTitle = 'Add Quiz';
        }
        else {
            this.pageTitle = "Edit Quiz: " + this.quiz.title;
            if (this.quiz.questions.length == 0) {
                this.questionService.getManageQuestions(this.quiz.id).subscribe(function (questions) {
                    if (questions.length > 0) {
                        _this.quiz.questions = questions;
                        _this.quiz.numberOfQuestions = questions.length;
                        console.log(_this.quiz);
                    }
                });
            }
        }
    };
    MakeQuizComponent.prototype.deleteQuiz = function () {
        var _this = this;
        if (this.quiz.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        }
        else {
            if (confirm("Really delete the Quiz: " + this.quiz.title + "?")) {
                this.quizService.deleteQuiz(this.quiz.id)
                    .subscribe(function () { return _this.onSaveComplete(_this.quiz.title + " was deleted"); }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    MakeQuizComponent.prototype.isValid = function (path) {
        var _this = this;
        //TODO: uncomment it
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(function (d) { return _this.dataIsValid[d] === true; }));
    };
    MakeQuizComponent.prototype.reset = function () {
        this.dataIsValid = null;
        this.currentQuiz = null;
        this.originalQuiz = null;
    };
    MakeQuizComponent.prototype.saveQuiz = function () {
        var _this = this;
        if (this.isValid(null)) {
            //set the createdBy field with the userId
            this.quiz.createdById = this.userId;
            this.quizService.saveQuiz(this.quiz)
                .subscribe(function () { return _this.onSaveComplete(_this.quiz.title + " was saved"); }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    };
    MakeQuizComponent.prototype.onSaveComplete = function (message) {
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
    };
    MakeQuizComponent.prototype.validate = function () {
        // Clear the validation object
        this.dataIsValid = {};
        // 'info' tab
        if (this.quiz.title && this.quiz.title.length >= 3 && this.quiz.description) {
            this.dataIsValid['info'] = true;
        }
        else {
            this.dataIsValid['info'] = false;
        }
        // 'tags' tab
        if (this.quiz.category.id > 0 /*&& this.quiz.categoryId.length >= 3 */) {
            this.dataIsValid['tags'] = true;
        }
        else {
            this.dataIsValid['tags'] = false;
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MakeQuizComponent.prototype, "savedQuiz", void 0);
    MakeQuizComponent = __decorate([
        core_1.Component({
            moduleId: module.i,
            selector: "edit-quiz",
            template: __webpack_require__(/*! ./template/quiz-edit.component.html */ "./src/app/quiz/template/quiz-edit.component.html"),
            styles: [__webpack_require__(/*! ./css/quiz-edit.component.css */ "./src/app/quiz/css/quiz-edit.component.css")]
        }),
        __metadata("design:paramtypes", [quiz_service_1.QuizService,
            question_service_1.QuestionService,
            message_service_1.MessageService,
            shared_service_1.SharedService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], MakeQuizComponent);
    return MakeQuizComponent;
}());
exports.MakeQuizComponent = MakeQuizComponent;


/***/ }),

/***/ "./src/app/quiz/modal-basic.ts":
/*!*************************************!*\
  !*** ./src/app/quiz/modal-basic.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var ng_bootstrap_1 = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var NgbdModalBasic = /** @class */ (function () {
    function NgbdModalBasic(modalService) {
        this.modalService = modalService;
    }
    NgbdModalBasic.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    NgbdModalBasic.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    NgbdModalBasic = __decorate([
        core_1.Component({
            selector: 'ngbd-modal-basic',
            template: __webpack_require__(/*! ./template/modal-basic.html */ "./src/app/quiz/template/modal-basic.html"),
            styles: ["\n        \n    "]
        })
        //.fade.in {opacity: 1;},
        //.modal.in .modal-dialog {-webkit-transform: translate(0, 0);-o-transform: translate(0, 0);transform: translate(0, 0);},
        //.modal-backdrop .fade .in  {opacity: 0.5!important;},
        //.modal-backdrop.fade {opacity: 0.5 !important;},
        ,
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
    ], NgbdModalBasic);
    return NgbdModalBasic;
}());
exports.NgbdModalBasic = NgbdModalBasic;


/***/ }),

/***/ "./src/app/quiz/progressbar-showvalue.ts":
/*!***********************************************!*\
  !*** ./src/app/quiz/progressbar-showvalue.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
__webpack_require__(/*! rxjs/add/observable/interval */ "./node_modules/rxjs-compat/_esm5/add/observable/interval.js");
var NgbdProgressbarShowvalue = /** @class */ (function () {
    function NgbdProgressbarShowvalue() {
        this.Math = Math;
        //this.number = 2.5
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbdProgressbarShowvalue.prototype, "completedToPass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbdProgressbarShowvalue.prototype, "totalToPass", void 0);
    NgbdProgressbarShowvalue = __decorate([
        core_1.Component({
            selector: 'ngbd-progressbar-showvalue',
            template: __webpack_require__(/*! ./template/progressbar-showvalue.html */ "./src/app/quiz/template/progressbar-showvalue.html"),
            styles: ["\n    ngb-progressbar {\n      margin-top: 5rem;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [])
    ], NgbdProgressbarShowvalue);
    return NgbdProgressbarShowvalue;
}());
exports.NgbdProgressbarShowvalue = NgbdProgressbarShowvalue;


/***/ }),

/***/ "./src/app/quiz/question-edit.component.ts":
/*!*************************************************!*\
  !*** ./src/app/quiz/question-edit.component.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var question_1 = __webpack_require__(/*! ./question */ "./src/app/quiz/question.ts");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var QuestionEditComponent = /** @class */ (function () {
    function QuestionEditComponent() {
        //this.initQuestion();
        this.cancelEditQuestion = new core_1.EventEmitter();
        this.pageSize = 10;
        //answer letter: a, b, c, d, ...
        this.letters = 'abcdefghijk';
        //{ id: 0, text: '', isCorrect: false }
    }
    QuestionEditComponent.prototype.ngOnInit = function () {
        if (this.question.title.length > 0) {
            this.editMode = true;
        }
    };
    QuestionEditComponent.prototype.cancel = function () {
        this.cancelEditQuestion.emit(true);
    };
    QuestionEditComponent.prototype.markCorrect = function (idx) {
        this.question.answers.forEach(function (answer, i) {
            answer.isCorrect = i === idx;
        });
    };
    QuestionEditComponent.prototype.removeAnswer = function (idx) {
        this.question.answers.splice(idx, 1);
        if (this.question.answers.length === 1) {
            this.question.answers[0].isCorrect = true;
        }
    };
    QuestionEditComponent.prototype.saveIsAvailable = function (frm) {
    };
    QuestionEditComponent.prototype.addAnswer = function () {
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
            }
            catch (e) {
            }
        }, 100);
    };
    QuestionEditComponent.prototype.ok = function () {
        if (this.editMode) {
            // if this is an edit, no need to return the question
            // it is already passed by reference
            //$uibModalInstance.close(null);
        }
        else {
            // return the question to be added to the quiz
            //$uibModalInstance.close(this.question);
            console.log(this.question);
            this.quiz.questions.push(this.question);
            //hide the add question panel
            this.cancelEditQuestion.emit(true);
            //this.initQuestion();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuestionEditComponent.prototype, "quiz", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", question_1.Question)
    ], QuestionEditComponent.prototype, "question", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuestionEditComponent.prototype, "cancelEditQuestion", void 0);
    __decorate([
        core_1.ViewChild('questionForm'),
        __metadata("design:type", forms_1.NgForm)
    ], QuestionEditComponent.prototype, "questionForm", void 0);
    __decorate([
        core_1.ViewChild('answerTextVar'),
        __metadata("design:type", Object)
    ], QuestionEditComponent.prototype, "answerTextElementRef", void 0);
    QuestionEditComponent = __decorate([
        core_1.Component({
            selector: 'add-question',
            providers: [],
            template: __webpack_require__(/*! ./template/question-edit.component.html */ "./src/app/quiz/template/question-edit.component.html"),
            styles: [__webpack_require__(/*! ./css/question-edit.component.css */ "./src/app/quiz/css/question-edit.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], QuestionEditComponent);
    return QuestionEditComponent;
}());
exports.QuestionEditComponent = QuestionEditComponent;


/***/ }),

/***/ "./src/app/quiz/question-list.component.ts":
/*!*************************************************!*\
  !*** ./src/app/quiz/question-list.component.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var QuestionListComponent = /** @class */ (function () {
    function QuestionListComponent() {
        this.openEditQuestion = new core_1.EventEmitter();
        this.deleteQuestion = new core_1.EventEmitter();
    }
    QuestionListComponent.prototype.loadPage = function (page) {
        console.log("current page number=" + page);
        //if (page !== this.previousPage) {
        //    this.previousPage = page;
        //    //this.loadData();
        //}
    };
    QuestionListComponent.prototype.mouseOver = function (msg) {
        var myMsg = "This question has " + msg + " answers available";
        console.log(myMsg);
    };
    QuestionListComponent.prototype.removeQuestion = function (idx) {
        this.deleteQuestion.emit(idx);
    };
    QuestionListComponent.prototype.openQuesitonMenu = function (question) {
        //emit true so that the edit question area becomes visible
        this.openEditQuestion.emit(question);
        //this.modalIsOpen = true;
        //var modalInstance = $uibModal.open({
        //    animation: true,
        //    appendTo: $('#manage-quiz'),
        //    templateUrl: '/Content/templates/add-question-template.html',
        //    controller: 'AddQuestionController',
        //    controllerAs: 'ctrl',
        //    resolve: {
        //        items: question
        //    }
        //});
        //modalInstance.result.then(function (question) {
        //    if (question !== null) {
        //        $scope.quiz.questions.push(question);
        //    }
        //}, function () {
        //    console.log('Modal dismissed at: ' + new Date());
        //});
        //modalInstance.closed.then(function () {
        //    console.log('close');
        //    $scope.modalIsOpen = false;
        //});
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuestionListComponent.prototype, "quiz", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuestionListComponent.prototype, "openEditQuestion", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuestionListComponent.prototype, "deleteQuestion", void 0);
    QuestionListComponent = __decorate([
        core_1.Component({
            selector: 'question-list',
            template: __webpack_require__(/*! ./template/question-list.component.html */ "./src/app/quiz/template/question-list.component.html"),
            styles: [__webpack_require__(/*! ./css/question-list.component.css */ "./src/app/quiz/css/question-list.component.css")]
        })
    ], QuestionListComponent);
    return QuestionListComponent;
}());
exports.QuestionListComponent = QuestionListComponent;


/***/ }),

/***/ "./src/app/quiz/question.service.ts":
/*!******************************************!*\
  !*** ./src/app/quiz/question.service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///api/quizzes/GetQuizQuestions/1
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var config_1 = __webpack_require__(/*! ../config */ "./src/app/config.ts");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var questionsUrl = config_1.CONFIG.baseUrls.questions;
var manageQuestionsUrl = config_1.CONFIG.baseUrls.manageQuestions;
var QuestionService = /** @class */ (function () {
    function QuestionService(http) {
        this.http = http;
    }
    QuestionService.prototype.getQuestions = function (qzid) {
        console.log("getQuestions: qzid=" + qzid);
        return this.http
            .get(questionsUrl + "/" + qzid)
            .pipe(operators_1.map(function (res) { return res; }));
    };
    QuestionService.prototype.getQuestion = function (qzid, id) {
        return this.getQuestions(qzid)
            .map(function (questions) { return questions.find(function (question) { return question.id === id; }); });
    };
    QuestionService.prototype.getManageQuestions = function (qzid) {
        console.log("getManageQuestions: qzid=" + qzid);
        return this.http
            .get(manageQuestionsUrl + "/" + qzid)
            .pipe(operators_1.map(function (res) { return res; }));
    };
    QuestionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], QuestionService);
    return QuestionService;
}());
exports.QuestionService = QuestionService;


/***/ }),

/***/ "./src/app/quiz/question.ts":
/*!**********************************!*\
  !*** ./src/app/quiz/question.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Answer = /** @class */ (function () {
    function Answer() {
    }
    return Answer;
}());
exports.Answer = Answer;
var Question = /** @class */ (function () {
    function Question() {
    }
    return Question;
}());
exports.Question = Question;


/***/ }),

/***/ "./src/app/quiz/quiz-edit-info.component.ts":
/*!**************************************************!*\
  !*** ./src/app/quiz/quiz-edit-info.component.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var question_service_1 = __webpack_require__(/*! ./question.service */ "./src/app/quiz/question.service.ts");
var QuizEditInfoComponent = /** @class */ (function () {
    function QuizEditInfoComponent(route, questionService) {
        this.route = route;
        this.questionService = questionService;
    }
    QuizEditInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.data.subscribe(function (data) {
            _this.quiz = data['quiz'];
            console.log("quiz info onInit to get data['quiz']");
            if (_this.quiz.id > 0) {
                if (_this.quiz.questions.length == 0) {
                    _this.questionService.getManageQuestions(_this.quiz.id).subscribe(function (questions) {
                        if (questions.length > 0) {
                            _this.quiz.questions = questions;
                            _this.quiz.numberOfQuestions = questions.length;
                            console.log(_this.quiz);
                        }
                    });
                }
            }
            //console.log(this.quiz);
            if (_this.quizForm) {
                //this.quizForm.reset();
            }
        });
    };
    QuizEditInfoComponent.prototype.addQuestion = function () {
        this.showEditQuestion = true;
        var numOfQx = this.quizForm.controls["quizQuestionsCount"].value;
        console.log("numOfQx=" + numOfQx);
        //this.quiz.questions = [];
        //this.quiz.numberOfQuestions = numOfQx;
        this.backup = '';
        this.initQuestion();
    };
    QuizEditInfoComponent.prototype.numOfQxMatch = function () {
        //if (this.quizForm.controls["quizQuestionsCount"].value == undefined) {
        //    this.quizForm.controls["quizQuestionsCount"].setValue(3);
        //}
        var numOfQx = this.quiz.numberOfQuestions; // this.quizForm.controls["quizQuestionsCount"].value;
        var qxCnt = this.quiz.questions.length;
        return qxCnt === numOfQx;
    };
    QuizEditInfoComponent.prototype.openEditQuestion = function () {
        this.showEditQuestion = true;
    };
    QuizEditInfoComponent.prototype.handleCancelEditQuestion = function (value) {
        this.showEditQuestion = !value;
    };
    QuizEditInfoComponent.prototype.handleOpenEditQuestion = function (question) {
        if (question) {
            this.showEditQuestion = true;
            this.question = question;
            this.backup = JSON.stringify(question);
        }
        else {
            this.initQuestion;
        }
    };
    QuizEditInfoComponent.prototype.handleDeleteQuestion = function (idx) {
        this.quiz.questions.splice(idx, 1);
    };
    QuizEditInfoComponent.prototype.initQuestion = function () {
        this.question = {
            id: 0,
            title: '',
            answers: [],
            selectedAnswer: 0,
            correctAnswer: 0,
        };
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], QuizEditInfoComponent.prototype, "quizForm", void 0);
    QuizEditInfoComponent = __decorate([
        core_1.Component({
            template: __webpack_require__(/*! ./template/quiz-edit-info.component.html */ "./src/app/quiz/template/quiz-edit-info.component.html")
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, question_service_1.QuestionService])
    ], QuizEditInfoComponent);
    return QuizEditInfoComponent;
}());
exports.QuizEditInfoComponent = QuizEditInfoComponent;


/***/ }),

/***/ "./src/app/quiz/quiz-edit-tags.component.ts":
/*!**************************************************!*\
  !*** ./src/app/quiz/quiz-edit-tags.component.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var map_1 = __webpack_require__(/*! rxjs/operator/map */ "./node_modules/rxjs-compat/_esm5/operator/map.js");
var debounceTime_1 = __webpack_require__(/*! rxjs/operator/debounceTime */ "./node_modules/rxjs-compat/_esm5/operator/debounceTime.js");
var distinctUntilChanged_1 = __webpack_require__(/*! rxjs/operator/distinctUntilChanged */ "./node_modules/rxjs-compat/_esm5/operator/distinctUntilChanged.js");
var category_service_1 = __webpack_require__(/*! ./category.service */ "./src/app/quiz/category.service.ts");
var QuizEditTagsComponent = /** @class */ (function () {
    function QuizEditTagsComponent(route, categoryService) {
        var _this = this;
        this.route = route;
        this.categoryService = categoryService;
        this.newTags = '';
        this.formatter = function (result) { return result.name.toUpperCase() || ''; };
        this.inputformatter = function (result) { return result.name || ''; };
        this.search = function (text$) {
            return map_1.map.call(distinctUntilChanged_1.distinctUntilChanged.call(debounceTime_1.debounceTime.call(text$, 200)), function (term) { return term === '' ? [] : _this.categories.filter(function (c) { return c.name.toLowerCase().indexOf(term.toLowerCase()) > -1; }).slice(0, 10); });
        };
    }
    QuizEditTagsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.data.subscribe(function (data) {
            _this.quiz = data['quiz'];
        });
        this.getCategories();
    };
    QuizEditTagsComponent.prototype.selectedItem = function (evt) {
        this.category = evt.item;
        this.quiz.category = this.category;
        //this.quiz.category.id = this.selCategory.id;
        console.log("category.id: " + this.quiz.category.id);
        console.log("category.name: " + this.quiz.category.name);
    };
    // Add the defined tags
    QuizEditTagsComponent.prototype.addTags = function () {
        var tagArray = this.newTags.split(',');
        this.quiz.tags = this.quiz.tags ? this.quiz.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    };
    // Remove the tag from the array of tags.
    QuizEditTagsComponent.prototype.removeTag = function (idx) {
        this.quiz.tags.splice(idx, 1);
        this.getCategories();
    };
    QuizEditTagsComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoryService.getCategories().subscribe(function (categories) { return _this.categories = categories; });
    };
    QuizEditTagsComponent = __decorate([
        core_1.Component({
            template: __webpack_require__(/*! ./template/quiz-edit-tags.component.html */ "./src/app/quiz/template/quiz-edit-tags.component.html"),
            styles: [__webpack_require__(/*! ./css/quiz-edit-tags.component.css */ "./src/app/quiz/css/quiz-edit-tags.component.css"), __webpack_require__(/*! ./css/bookblock.css */ "./src/app/quiz/css/bookblock.css"), __webpack_require__(/*! ../styles/less/index.css */ "./src/app/styles/less/index.css")],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, category_service_1.CategoryService])
    ], QuizEditTagsComponent);
    return QuizEditTagsComponent;
}());
exports.QuizEditTagsComponent = QuizEditTagsComponent;


/***/ }),

/***/ "./src/app/quiz/quiz-edit.component.ts":
/*!*********************************************!*\
  !*** ./src/app/quiz/quiz-edit.component.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var quiz_service_1 = __webpack_require__(/*! ./quiz.service */ "./src/app/quiz/quiz.service.ts");
var question_service_1 = __webpack_require__(/*! ./question.service */ "./src/app/quiz/question.service.ts");
var message_service_1 = __webpack_require__(/*! ../messages/message.service */ "./src/app/messages/message.service.ts");
var shared_service_1 = __webpack_require__(/*! ../shared/shared-service */ "./src/app/shared/shared-service.ts");
var QuizEditComponent = /** @class */ (function () {
    function QuizEditComponent(QuizService, questionService, messageService, sharedService, route, router) {
        this.QuizService = QuizService;
        this.questionService = questionService;
        this.messageService = messageService;
        this.sharedService = sharedService;
        this.route = route;
        this.router = router;
        this.savedQuiz = new core_1.EventEmitter();
        this.pageTitle = 'Quiz Edit';
        this.dataIsValid = {};
    }
    Object.defineProperty(QuizEditComponent.prototype, "quiz", {
        get: function () {
            return this.currentQuiz;
        },
        set: function (value) {
            this.currentQuiz = value;
            // Clone the object to retain a copy
            this.originalQuiz = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuizEditComponent.prototype, "isDirty", {
        get: function () {
            return JSON.stringify(this.originalQuiz) !== JSON.stringify(this.currentQuiz);
        },
        enumerable: true,
        configurable: true
    });
    QuizEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.onQuizRetrieved(data['quiz']);
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
    };
    QuizEditComponent.prototype.quizClick = function (Quiz) {
        console.log("quizClick event!");
        console.log(Quiz);
        this.quiz = Quiz;
    };
    QuizEditComponent.prototype.onQuizRetrieved = function (Quiz) {
        var _this = this;
        console.log("onQuizRetrieved");
        console.log(Quiz);
        this.quiz = Quiz;
        if (this.quiz.id === 0) {
            this.pageTitle = 'Add Quiz';
            //use Andrew's autoID service
            //this.quiz = new AutoIDLocalStorageService<Quiz>('YT.quiz', 'id', null);
        }
        else {
            this.pageTitle = "Edit Quiz: " + this.quiz.title;
            if (this.quiz.questions.length == 0) {
                this.questionService.getManageQuestions(this.quiz.id).subscribe(function (questions) {
                    if (questions.length > 0) {
                        _this.quiz.questions = questions;
                        _this.quiz.numberOfQuestions = questions.length;
                        console.log(_this.quiz);
                    }
                });
            }
        }
    };
    QuizEditComponent.prototype.deleteQuiz = function () {
        var _this = this;
        if (this.quiz.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        }
        else {
            if (confirm("Really delete the Quiz: " + this.quiz.title + "?")) {
                this.QuizService.deleteQuiz(this.quiz.id)
                    .subscribe(function () { return _this.onSaveComplete(_this.quiz.title + " was deleted"); }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    QuizEditComponent.prototype.isValid = function (path) {
        var _this = this;
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(function (d) { return _this.dataIsValid[d] === true; }));
    };
    QuizEditComponent.prototype.reset = function () {
        this.dataIsValid = null;
        this.currentQuiz = null;
        this.originalQuiz = null;
    };
    QuizEditComponent.prototype.saveQuiz = function () {
        var _this = this;
        if (this.isValid(null)) {
            this.QuizService.saveQuiz(this.quiz)
                .subscribe(function () { return _this.onSaveComplete(_this.quiz.title + " was saved"); }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    };
    QuizEditComponent.prototype.onSaveComplete = function (message) {
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
    };
    QuizEditComponent.prototype.validate = function () {
        // Clear the validation object
        this.dataIsValid = {};
        // 'info' tab
        if (this.quiz.title && this.quiz.title.length >= 3 && this.quiz.description) {
            this.dataIsValid['info'] = true;
        }
        else {
            this.dataIsValid['info'] = false;
        }
        // 'tags' tab
        if (this.quiz.category.id > 0 /*&& this.quiz.categoryId.length >= 3 */) {
            this.dataIsValid['tags'] = true;
        }
        else {
            this.dataIsValid['tags'] = false;
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuizEditComponent.prototype, "savedQuiz", void 0);
    QuizEditComponent = __decorate([
        core_1.Component({
            moduleId: module.i,
            selector: "edit-quiz",
            template: __webpack_require__(/*! ./template/quiz-edit.component.html */ "./src/app/quiz/template/quiz-edit.component.html"),
            styles: [__webpack_require__(/*! ./css/quiz-edit.component.css */ "./src/app/quiz/css/quiz-edit.component.css")]
        }),
        __metadata("design:paramtypes", [quiz_service_1.QuizService,
            question_service_1.QuestionService,
            message_service_1.MessageService,
            shared_service_1.SharedService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], QuizEditComponent);
    return QuizEditComponent;
}());
exports.QuizEditComponent = QuizEditComponent;


/***/ }),

/***/ "./src/app/quiz/quiz-eval.service.ts":
/*!*******************************************!*\
  !*** ./src/app/quiz/quiz-eval.service.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var config_1 = __webpack_require__(/*! ../config */ "./src/app/config.ts");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var quizEvalUrl = config_1.CONFIG.baseUrls.quizEval;
var QuizEvalService = /** @class */ (function () {
    function QuizEvalService(http) {
        this.http = http;
    }
    QuizEvalService.prototype.getQuizEval = function (id) {
        return this.http
            .get(quizEvalUrl + "/" + id)
            .pipe(operators_1.map(function (res) { return res; }));
    };
    QuizEvalService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], QuizEvalService);
    return QuizEvalService;
}());
exports.QuizEvalService = QuizEvalService;


/***/ }),

/***/ "./src/app/quiz/quiz-eval.ts":
/*!***********************************!*\
  !*** ./src/app/quiz/quiz-eval.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var QuizEval = /** @class */ (function () {
    function QuizEval() {
    }
    QuizEval.prototype.getSuccessPercentage = function () {
        return this.correctlyAnswered.length / this.totalQuestions * 100;
    };
    return QuizEval;
}());
exports.QuizEval = QuizEval;


/***/ }),

/***/ "./src/app/quiz/quiz-guard.service.ts":
/*!********************************************!*\
  !*** ./src/app/quiz/quiz-guard.service.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var QuizEditGuard = /** @class */ (function () {
    function QuizEditGuard() {
    }
    QuizEditGuard.prototype.canDeactivate = function (component) {
        if (component.isDirty) {
            var QuizName = component.quiz.title || 'New Quiz';
            return confirm("Navigate away and lose all changes to " + QuizName + "?");
        }
        return true;
    };
    QuizEditGuard = __decorate([
        core_1.Injectable()
    ], QuizEditGuard);
    return QuizEditGuard;
}());
exports.QuizEditGuard = QuizEditGuard;


/***/ }),

/***/ "./src/app/quiz/quiz-list.component.ts":
/*!*********************************************!*\
  !*** ./src/app/quiz/quiz-list.component.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var quiz_service_1 = __webpack_require__(/*! ./quiz.service */ "./src/app/quiz/quiz.service.ts");
var shared_service_1 = __webpack_require__(/*! ../shared/shared-service */ "./src/app/shared/shared-service.ts");
var QuizListComponent = /** @class */ (function () {
    function QuizListComponent(quizService, sharedService) {
        var _this = this;
        this.quizService = quizService;
        this.sharedService = sharedService;
        sharedService.changeEmitted$.subscribe(function (text) {
            console.log(text);
            _this.handleSavedQuiz(true);
        });
    }
    QuizListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.quizs = [];
        this.quizService.getQuizs()
            .subscribe(function (quizs) { return _this.quizs = quizs; });
    };
    QuizListComponent.prototype.handleSavedQuiz = function (value) {
        var _this = this;
        this.showEditQuiz = !value;
        console.log("saved quiz event handled!");
        this.quizs = [];
        this.quizService.getQuizs()
            .subscribe(function (quizs) { return _this.quizs = quizs; });
    };
    QuizListComponent = __decorate([
        core_1.Component({
            moduleId: module.i,
            template: __webpack_require__(/*! ./template/quiz-list.component.html */ "./src/app/quiz/template/quiz-list.component.html"),
            styles: ['.quizs {list-style-type: none;}', '*.quiz li {padding: 4px;cursor: pointer;}']
        }),
        __metadata("design:paramtypes", [quiz_service_1.QuizService, shared_service_1.SharedService])
    ], QuizListComponent);
    return QuizListComponent;
}());
exports.QuizListComponent = QuizListComponent;


/***/ }),

/***/ "./src/app/quiz/quiz-resolver.service.ts":
/*!***********************************************!*\
  !*** ./src/app/quiz/quiz-resolver.service.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
__webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
__webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
__webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
var quiz_service_1 = __webpack_require__(/*! ./quiz.service */ "./src/app/quiz/quiz.service.ts");
var question_service_1 = __webpack_require__(/*! ./question.service */ "./src/app/quiz/question.service.ts");
var QuizResolver = /** @class */ (function () {
    function QuizResolver(quizService, questionService, router) {
        this.quizService = quizService;
        this.questionService = questionService;
        this.router = router;
    }
    QuizResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var id = route.params['id'];
        console.log("resolver id=" + id);
        if (isNaN(id)) {
            console.log("Quiz id was not a number: " + id);
            //this.router.navigate(['/quizs']);
            return rxjs_1.of(null);
        }
        return this.quizService.getQuiz2(+id)
            .map(function (Quiz) {
            if (Quiz) {
                //default to 6
                Quiz.numberOfQuestions = 0;
                Quiz.questions = [];
                return Quiz;
            }
            console.log("Quiz was not found: " + id);
            _this.router.navigate(['/quizs']);
            return null;
        });
        //this.questionService.getQuestions(+id).subscribe(questions => {
        //    this.questions = questions;
        //});
        //return this.quizService.getQuiz(+id)
        //    .flatMap(q => {
        //        this.quiz = q; // save the quiz
        //        return Observable.of(q); // pass on the Observable
        //    })
        //    .flatMap(q => {
        //        return this.questionService.getQuestions(this.quiz.id)
        //            .map(qxs => {
        //                this.questions = qxs;
        //                q.questions = this.questions
        //                //return q;
        //            })
        //    })
        //    .subscribe();
    };
    QuizResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [quiz_service_1.QuizService,
            question_service_1.QuestionService,
            router_1.Router])
    ], QuizResolver);
    return QuizResolver;
}());
exports.QuizResolver = QuizResolver;


/***/ }),

/***/ "./src/app/quiz/quiz-result.component.ts":
/*!***********************************************!*\
  !*** ./src/app/quiz/quiz-result.component.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var quiz_eval_1 = __webpack_require__(/*! ./quiz-eval */ "./src/app/quiz/quiz-eval.ts");
var quiz_eval_service_1 = __webpack_require__(/*! ./quiz-eval.service */ "./src/app/quiz/quiz-eval.service.ts");
var QuizResultComponent = /** @class */ (function () {
    function QuizResultComponent(route, router, http, quizEvalService) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.quizEvalService = quizEvalService;
    }
    ;
    QuizResultComponent.prototype.GetSuccessPercentage = function () {
        return 66;
    };
    QuizResultComponent.prototype.ngOnInit = function () {
        console.log("quiz result init");
        //let sid = this.solution.id;
        //console.log("solution id: " + sid);
        this.quizEval = this.solution;
        console.log(this.quizEval);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", quiz_eval_1.QuizEval)
    ], QuizResultComponent.prototype, "solution", void 0);
    QuizResultComponent = __decorate([
        core_1.Component({
            moduleId: module.i,
            template: __webpack_require__(/*! ./template/quiz-result.component.html */ "./src/app/quiz/template/quiz-result.component.html"),
            styles: [__webpack_require__(/*! ./css/quiz-result.component.css */ "./src/app/quiz/css/quiz-result.component.css"), __webpack_require__(/*! ./css/bookblock.css */ "./src/app/quiz/css/bookblock.css"), __webpack_require__(/*! ../styles/less/index.css */ "./src/app/styles/less/index.css")],
            selector: "solution-area",
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            http_1.HttpClient,
            quiz_eval_service_1.QuizEvalService])
    ], QuizResultComponent);
    return QuizResultComponent;
}());
exports.QuizResultComponent = QuizResultComponent;


/***/ }),

/***/ "./src/app/quiz/quiz.service.ts":
/*!**************************************!*\
  !*** ./src/app/quiz/quiz.service.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var http_1 = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var Observable_1 = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
//import 'rxjs/add/observable/of';
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var config_1 = __webpack_require__(/*! ../config */ "./src/app/config.ts");
var http_2 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var quizsUrl = config_1.CONFIG.baseUrls.quizs;
var quizUrl = config_1.CONFIG.baseUrls.quiz;
var quizCreateUrl = config_1.CONFIG.baseUrls.quizCreate;
var quizUpdateUrl = config_1.CONFIG.baseUrls.quizUpdate;
var QuizService = /** @class */ (function () {
    function QuizService(http) {
        this.http = http;
        this.baseUrl = 'api/quizs';
        this.tokenKey = 'accessToken';
        this.httpOptions = {
            headers: new http_2.HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
        };
    }
    QuizService.prototype.createAuthorizationHeader = function () {
        this.token = sessionStorage.getItem(this.tokenKey);
        console.log(this.token);
        if (this.token) {
            this.headers = new http_2.HttpHeaders({
                'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token
            });
        }
        //headers.append('Authorization', 'Basic ' +
        //    btoa('username:password'));
    };
    QuizService.prototype.getQuizs = function () {
        //let headers = new Headers();
        this.createAuthorizationHeader();
        console.log(this.headers);
        return this.http
            .get(quizsUrl, {
            headers: this.headers
        })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    QuizService.prototype.getQuiz2 = function (id) {
        if (id === 0) {
            console.log('Quiz id is zero, the add mode');
            return rxjs_1.of(this.initializeQuiz());
        }
        ;
        this.createAuthorizationHeader();
        console.log(this.headers);
        return this.http
            .get(quizUrl + "/" + id, {
            headers: this.headers
        })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    QuizService.prototype.getQuiz = function (id) {
        if (id === 0) {
            console.log('Quiz id is zero, the add mode');
            return Observable_1.Observable.of(this.initializeQuiz());
        }
        ;
        //const url = `${this.baseUrl}/${id}`;
        //return this.http.get(url)
        //    .map(this.extractData)
        //    .do(data => console.log('getProduct: ' + JSON.stringify(data)))
        //    .catch(this.handleError);
        return this.getQuizs()
            .map(function (quizs) { return quizs.find(function (quiz) { return quiz.id === id; }); });
    };
    QuizService.prototype.initializeQuiz = function () {
        // Return an initialized object
        return {
            id: 0,
            title: null,
            description: null,
            categoryId: null,
            category: {
                id: 0, name: null, AvatarUrl: null
            },
            createdById: null,
            isPrivate: true,
            shuffleAnswers: false,
            questions: [],
            numberOfQuestions: 3,
        };
    };
    QuizService.prototype.saveQuiz = function (quiz) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
        //let options = new RequestOptions({ headers: headers });
        if (quiz.id === 0) {
            return this.createQuiz(quiz);
        }
        return this.updateQuiz(quiz);
    };
    QuizService.prototype.createQuiz = function (quiz) {
        quiz.id = undefined;
        return this.http.post(quizCreateUrl, quiz, this.httpOptions)
            .pipe(operators_1.map(function (res) { return res; }), operators_1.tap(function (data) { return console.log('createQuiz: ' + JSON.stringify(data)); }));
    };
    // private extractData(response: Response) {
    //     return response.text() ? response.json() : {};
    //     //let body = response.json();
    //     //return body.data || {};
    // }
    QuizService.prototype.updateQuiz = function (quiz) {
        var url = quizUpdateUrl + "/" + quiz.id;
        return this.http.put(url, quiz, this.httpOptions)
            .map(function () { return quiz; })
            .do(function (data) { return console.log('updateQuiz: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    QuizService.prototype.deleteQuiz = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.baseUrl + "/" + id;
        return this.http.delete(url, this.httpOptions)
            .do(function (data) { return console.log('deleteQuiz: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    QuizService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error.statusText || 'Server error');
    };
    QuizService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_2.HttpClient])
    ], QuizService);
    return QuizService;
}());
exports.QuizService = QuizService;


/***/ }),

/***/ "./src/app/quiz/solve-quiz.component.ts":
/*!**********************************************!*\
  !*** ./src/app/quiz/solve-quiz.component.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var question_service_1 = __webpack_require__(/*! ./question.service */ "./src/app/quiz/question.service.ts");
var config_1 = __webpack_require__(/*! ../config */ "./src/app/config.ts");
var quizSolveUrl = config_1.CONFIG.baseUrls.quizSolve;
var SolveQuizComponent = /** @class */ (function () {
    function SolveQuizComponent(elRef, vcRef, route, router, http, zone, questionService) {
        //this.bbArea = elRef.nativeElement.getElementsById("blockbook");
        this.elRef = elRef;
        this.vcRef = vcRef;
        this.route = route;
        this.router = router;
        this.http = http;
        this.zone = zone;
        this.questionService = questionService;
        this.httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
        };
    }
    SolveQuizComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemsPerPage = 1;
        this.page = 1;
        this.questions = [];
        this.resetHighlightAnswers();
        this.pager = {};
        this.route
            .params
            .map(function (params) { return params['id']; })
            .do(function (id) { return _this.qzid = +id; })
            .subscribe(function (id) {
            //this.getQuestions(id);
            _this.questionService.getQuestions(id)
                .subscribe(function (questions) {
                console.log("subscribe getQuizQuestions...");
                _this.questions = questions;
                console.log(questions);
                _this.page = 1;
                var idx = 0;
                _this.quizSolution = null;
                _this.questionId = questions[idx].id;
                //this.question = questions[idx];
                console.log("current question id=" + _this.questionId);
                _this.questionsCount = questions.length;
                _this.questionsAnswered = 0;
                _this.quiz = _this.route.snapshot.data['quiz'];
                console.log("qz title=" + _this.quiz.title);
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
        $('#bb-bookblock').bookblock({
            speed: 500,
            shadowSides: 0.8,
            shadowFlip: 0.7
        });
    };
    SolveQuizComponent.prototype.ngAfterViewInit = function () {
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
    };
    SolveQuizComponent.prototype.ngAfterViewChecked = function () {
        //this.zone.runOutsideAngular(() => {
        //    this.bookBlock = new BookBlock(this.bbArea.nativeElement, {
        //        speed: 500,
        //        shadowSides: 0.8,
        //        shadowFlip: 0.7
        //    });
        //});
        console.log("ngAfterViewInit qzid=" + this.qzid);
    };
    SolveQuizComponent.prototype.loadPage = function (page) {
        console.log("current page number=" + page);
        this.flip(this.pager.currentPage);
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.pager.currentPage = page;
            this.loadData();
        }
    };
    SolveQuizComponent.prototype.selectAnswer = function (question, index) {
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
    };
    SolveQuizComponent.prototype.progress = function () {
        var total = this.questionsCount;
        var answered = this.questions.filter(function (q) {
            return q.selectedAnswer >= 0;
        }).length;
        var completedInPercent = Math.round((answered / total) * 100);
        //this.elRef.nativeElement.style = `width:${completedInPercent}%;`;
        //self.$progressBar.style = `width:${completedInPercent}%;`;
        return completedInPercent;
    };
    ;
    SolveQuizComponent.prototype.submit = function () {
        var _this = this;
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
            .pipe(operators_1.map(function (res) { return res; }
        //var result = res.json();
        //console.log(result);
        //var solution = <QuizSolution>res.json();
        //console.log(solution);
        //this.sid = solution.id;
        ), // ...and calling .json() on the response to return data
        operators_1.tap(function (solution) {
            //console.log("solution id=" + solution.id);
            console.log(solution);
            _this.quizSolution = solution;
            //this.sid = solution.id;
        }))
            .subscribe(function () {
            //this.router.navigate(['result', this.sid], { relativeTo: this.route });
        });
        // .catchError((error: any) => Observable.throw(<any>error || 'Server error')) //...errors if
        //.subscribe(function (response) {
        //    console.log(response);
        //    //document.open();
        //    //document.write(response.json);
        //    //document.close();
        //}, error => this.errorMessage = <any>error);
    };
    SolveQuizComponent.prototype.flip = function (toPageNumber) {
        setTimeout(function () {
            console.log('flip to the page ' + toPageNumber);
            $('#bb-bookblock').bookblock('jump', toPageNumber);
            //this.page.$bookBlock.jump(toPageNumber);
            //this.bookblock.jump(toPageNumber);
        }, 60);
    };
    SolveQuizComponent.prototype.loadData = function () {
        this.resetHighlightAnswers();
        this.question = this.questions[this.page - 1];
        //this.route
        //    .params
        //    .map(params => params['id'])
        //    .do(id => this.qzid = +id)
        //    .subscribe(id => this.getQuestion(id, this.question.id));
        //this.getQuestion(this.qzid, this.qxid);
    };
    SolveQuizComponent.prototype.resetHighlightAnswers = function () {
        this.highlightAnswer = [];
    };
    SolveQuizComponent.prototype.getQuestions = function (id) {
        var _this = this;
        this.questionService.getQuestions(id)
            .subscribe(function (questions) { return _this.questions = questions; });
    };
    //private getQuestion(id, qxid) {
    //    this.questionService.getQuestion(id, qxid)
    //        .subscribe(question => this.question = question);
    //}
    SolveQuizComponent.prototype.initBookBlock = function () {
        var Page = (function () {
            var config = {
                $bookBlock: $('#bb-bookblock'),
                $navNext: $('#bb-nav-next'),
                $navPrev: $('#bb-nav-prev'),
                $navFirst: $('#bb-nav-first'),
                $navLast: $('#bb-nav-last')
            }, init = function () {
                config.$bookBlock.bookblock({
                    speed: 1000,
                    shadowSides: 0.8,
                    shadowFlip: 0.4
                });
                initEvents();
            }, initEvents = function () {
                var $slides = config.$bookBlock.children();
                // add navigation events
                config.$navNext.on('click touchstart', function () {
                    config.$bookBlock.bookblock('next');
                    return false;
                });
                config.$navPrev.on('click touchstart', function () {
                    config.$bookBlock.bookblock('prev');
                    return false;
                });
                config.$navFirst.on('click touchstart', function () {
                    config.$bookBlock.bookblock('first');
                    return false;
                });
                config.$navLast.on('click touchstart', function () {
                    config.$bookBlock.bookblock('last');
                    return false;
                });
                // add swipe events
                $slides.on({
                    'swipeleft': function (event) {
                        config.$bookBlock.bookblock('next');
                        return false;
                    },
                    'swiperight': function (event) {
                        config.$bookBlock.bookblock('prev');
                        return false;
                    }
                });
                // add keyboard events
                $(document).keydown(function (e) {
                    var keyCode = e.keyCode || e.which, arrow = {
                        left: 37,
                        up: 38,
                        right: 39,
                        down: 40
                    };
                    switch (keyCode) {
                        case arrow.left:
                            config.$bookBlock.bookblock('prev');
                            break;
                        case arrow.right:
                            config.$bookBlock.bookblock('next');
                            break;
                    }
                });
            };
            return { init: init };
        })();
        Page.init();
    };
    SolveQuizComponent = __decorate([
        core_1.Component({
            moduleId: module.i,
            template: __webpack_require__(/*! ./template/solve-quiz.component.html */ "./src/app/quiz/template/solve-quiz.component.html"),
            styles: [__webpack_require__(/*! ./css/solve-quiz.component.css */ "./src/app/quiz/css/solve-quiz.component.css"), __webpack_require__(/*! ../styles/less/index.css */ "./src/app/styles/less/index.css")]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.ViewContainerRef,
            router_1.ActivatedRoute,
            router_1.Router,
            http_1.HttpClient,
            core_1.NgZone,
            question_service_1.QuestionService])
    ], SolveQuizComponent);
    return SolveQuizComponent;
}());
exports.SolveQuizComponent = SolveQuizComponent;


/***/ }),

/***/ "./src/app/quiz/take-quiz.component.ts":
/*!*********************************************!*\
  !*** ./src/app/quiz/take-quiz.component.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var question_service_1 = __webpack_require__(/*! ./question.service */ "./src/app/quiz/question.service.ts");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var TakeQuizComponent = /** @class */ (function () {
    //@ViewChild('blockbook') bbArea: ElementRef;
    function TakeQuizComponent(elRef, vcRef, route, router, http, zone, questionService) {
        //this.bbArea = elRef.nativeElement.getElementsById("blockbook");
        this.elRef = elRef;
        this.vcRef = vcRef;
        this.route = route;
        this.router = router;
        this.http = http;
        this.zone = zone;
        this.questionService = questionService;
    }
    TakeQuizComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemsPerPage = 1;
        this.page = 1;
        this.questions = [];
        this.resetHighlightAnswers();
        this.pager = {};
        this.route.params.subscribe(function (params) {
            _this.userId = params['uid'];
            console.log("user id from params");
            console.log(_this.userId);
        });
        this.route
            .params
            .map(function (params) { return params['id']; })
            .do(function (id) { return _this.qzid = +id; })
            .subscribe(function (id) {
            //this.getQuestions(id);
            _this.questionService.getQuestions(id)
                .subscribe(function (questions) {
                _this.questions = questions;
                console.log(questions);
                _this.page = 1;
                var idx = 0;
                _this.quizSolution = null;
                _this.questionId = questions[idx].id;
                //this.question = questions[idx];
                console.log("current question id=" + _this.questionId);
                _this.questionsCount = questions.length;
                _this.questionsAnswered = 0;
                //this.quiz = this.route.snapshot.data['quiz'];
                //console.log("qz title=" + this.quiz.title);
            });
        });
        this.totalItems = this.questions.length;
        this.pager.currentPage = 1;
        this.pager.pageSize = 1;
        this.pager.totalPages = this.questionsCount;
        var userId = JSON.parse(localStorage.getItem('myUserId'));
        console.log("uid in localStorage in take-quiz OnInit event " + userId);
    };
    TakeQuizComponent.prototype.ngAfterViewInit = function () {
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
    };
    TakeQuizComponent.prototype.ngAfterViewChecked = function () {
        //this.zone.runOutsideAngular(() => {
        //    this.bookBlock = new BookBlock(this.bbArea.nativeElement, {
        //        speed: 500,
        //        shadowSides: 0.8,
        //        shadowFlip: 0.7
        //    });
        //});
        console.log("ngAfterViewInit take-quiz qzid=" + this.qzid);
        //console.log(this.bbArea.nativeElement);
        //this.bbArea = document.getElementById("bb-blockbook");
        //this.bookBlock = new BookBlock(this.bbArea, {
        //    speed: 500,
        //    shadowSides: 0.8,
        //    shadowFlip: 0.7
        //});
    };
    TakeQuizComponent.prototype.loadPage = function (page) {
        console.log("current page number=" + page);
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.loadData();
        }
    };
    TakeQuizComponent.prototype.selectAnswer = function (question, index) {
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
        this.flip(this.pager.currentPage);
    };
    TakeQuizComponent.prototype.progress = function () {
        var total = this.questionsCount;
        var answered = this.questions.filter(function (q) {
            return q.selectedAnswer >= 0;
        }).length;
        var completedInPercent = Math.round((answered / total) * 100);
        //this.elRef.nativeElement.style = `width:${completedInPercent}%;`;
        //self.$progressBar.style = `width:${completedInPercent}%;`;
        return completedInPercent;
    };
    ;
    TakeQuizComponent.prototype.submit = function () {
        var _this = this;
        console.log("submit quiz id=" + this.qzid);
        // retrieve the user id from session storage.  !!! always null, don't know why!!!
        //this.userId = JSON.parse(localStorage.getItem('myUserId'));
        console.log("submit user id");
        console.log(this.userId);
        var data = {
            forQuizId: this.qzid,
            forUserId: this.userId,
            selectedAnswerIds: this.questions.map(function (question) {
                console.log(question.answers[question.selectedAnswer].id);
                var id = question.answers[question.selectedAnswer].id;
                return id;
            })
        };
        console.log("posting data....", data);
        this.http.post('/api/quizzes/Solve', data)
            .pipe(operators_1.map(function (res) { return res; }
        //var result = res.json();
        //console.log(result);
        //var solution = <QuizSolution>res.json();
        //console.log(solution);
        //this.sid = solution.id;
        ), 
        // ...and calling .json() on the response to return data
        operators_1.tap(function (solution) {
            console.log("solution id=" + solution.id);
            console.log(solution);
            _this.quizSolution = solution;
            _this.sid = solution.id;
        }), operators_1.catchError(function (error) { return rxjs_1.of("Bad Promise: " + error); }))
            .subscribe(function () {
            //this.router.navigate(['result', this.sid], { relativeTo: this.route });
        });
        //.subscribe(function (response) {
        //    console.log(response);
        //    //document.open();
        //    //document.write(response.json);
        //    //document.close();
        //}, error => this.errorMessage = <any>error);
    };
    TakeQuizComponent.prototype.flip = function (toPageNumber) {
        setTimeout(function () {
            //self.bookBlock.jump(toPageNumber);
        }, 60);
    };
    TakeQuizComponent.prototype.loadData = function () {
        this.resetHighlightAnswers();
        this.question = this.questions[this.page - 1];
        //this.route
        //    .params
        //    .map(params => params['id'])
        //    .do(id => this.qzid = +id)
        //    .subscribe(id => this.getQuestion(id, this.question.id));
        //this.getQuestion(this.qzid, this.qxid);
    };
    TakeQuizComponent.prototype.resetHighlightAnswers = function () {
        this.highlightAnswer = [];
    };
    TakeQuizComponent.prototype.getQuestions = function (id) {
        var _this = this;
        this.questionService.getQuestions(id)
            .subscribe(function (questions) { return _this.questions = questions; });
    };
    TakeQuizComponent = __decorate([
        core_1.Component({
            moduleId: module.i,
            selector: 'my-take-quiz',
            template: __webpack_require__(/*! ./template/solve-quiz.component.html */ "./src/app/quiz/template/solve-quiz.component.html"),
            styles: [__webpack_require__(/*! ./css/solve-quiz.component.css */ "./src/app/quiz/css/solve-quiz.component.css"), __webpack_require__(/*! ./css/bookblock.css */ "./src/app/quiz/css/bookblock.css"), __webpack_require__(/*! ../styles/less/index.css */ "./src/app/styles/less/index.css")]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.ViewContainerRef,
            router_1.ActivatedRoute,
            router_1.Router,
            http_1.HttpClient,
            core_1.NgZone,
            question_service_1.QuestionService])
    ], TakeQuizComponent);
    return TakeQuizComponent;
}());
exports.TakeQuizComponent = TakeQuizComponent;


/***/ }),

/***/ "./src/app/quiz/template/modal-basic.html":
/*!************************************************!*\
  !*** ./src/app/quiz/template/modal-basic.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\r\n    <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Modal title</h4>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <p>One fine body&hellip;</p>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Close</button>\r\n    </div>\r\n</ng-template>\r\n<button class=\"btn btn-lg btn-outline-primary\" (click)=\"open(content)\">Add Questions</button>\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/quiz/template/progressbar-showvalue.html":
/*!**********************************************************!*\
  !*** ./src/app/quiz/template/progressbar-showvalue.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p><ngb-progressbar showValue=\"true\" type=\"success\" [value]=\"Math.round(completedToPass / totalToPass * 100)\" [animated]=\"true\"></ngb-progressbar></p>"

/***/ }),

/***/ "./src/app/quiz/template/question-edit.component.html":
/*!************************************************************!*\
  !*** ./src/app/quiz/template/question-edit.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n    <button type=\"button\" class=\"close\" (click)=\"cancel()\" aria-hidden=\"true\">×</button>\r\n    <h3 class=\"modal-title\">Enter question details</h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n    <form name=\"questionForm\" class=\"form-horizontal\" novalidate #questionForm=\"ngForm\">\r\n        <fieldset>\r\n            <!-- Title -->\r\n            <div class=\"form-group\">\r\n                <label for=\"title\" class=\"col-md-2 control-label\">Question</label>\r\n                <div class=\"col-md-10\">\r\n                    <textarea [(ngModel)] = question.title\r\n                              id=\"title\"\r\n                              class=\"form-control\" name=\"title\" placeholder=\"Enter the question\"\r\n                              required minlength=\"5\"\r\n                              (focus)=\"titleFocus=true\" (blur)=\"titleFocus=false\"\r\n                              #titleVar=\"ngModel\"></textarea>\r\n                    <div *ngIf=\"(titleVar.touched ||titleVar.dirty || question.id !== 0) && titleVar.errors\"\r\n                         class=\"alert alert-info\">\r\n                        <p>Enter a question of at least 5 characters.</p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- Answers -->\r\n            <div *ngFor=\"let answer of question.answers; let i = index\" class=\"form-group\">\r\n                <label for=\"answerText{{i}}\"\r\n                       (click)=\"markCorrect(i)\"\r\n                       class=\"col-md-2 control-label answer-mark\"\r\n                       [ngClass]=\"{correct: answer.isCorrect}\">\r\n                    <i class=\"fa fa-check\" *ngIf=\"answer.isCorrect\"></i>\r\n                    <a href [innerHTML]=\"letters[i]\">\r\n                    </a>\r\n                </label>\r\n                <div name=\"answerForm\" class=\"col-md-10\" >\r\n                    <div class=\"input-group\" >\r\n                        <input type=\"text\"\r\n                                [(ngModel)]=\"answer.text\"\r\n                                id=\"answerText{{i}}\"\r\n                               class=\"form-control answer-field\" name=\"answerText{{i}}\" placeholder=\"Answer\"\r\n                               required minlength=\"2\"\r\n                               (focus)=\"answer.focus=true\" (blur)=\"answer.focus=false\"\r\n                               #answerTextVar=\"ngModel\"\r\n                               >\r\n                        <span class=\"input-group-btn\">\r\n                            <button class=\"btn btn-danger\" (click)=\"removeAnswer(i)\"\r\n                                    arial-label=\"Remove\">\r\n                                <span class=\"glyphicon glyphicon-remove\"></span>\r\n                            </button>\r\n                        </span>\r\n                    </div>\r\n                    <div *ngIf=\"(answerTextVar.touched || answerTextVar.dirty || question.id !== 0) && answerTextVar.errors\"\r\n                         class=\"alert alert-info\">\r\n                        <p *ngIf=\"answerTextVar.errors.minlength\">Enter an answer of at least 2 characters</p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- Add Answer Button -->\r\n            <div class=\"form-group\">\r\n                <div class=\"col-md-10 col-md-offset-2\">\r\n                    <span uib-popover=\"Please, assign at least 2 answers and mark the correct answer!\"\r\n                          popover-trigger=\"none\"\r\n                          popover-is-open=\"!saveIsAvailable(questionForm)\"\r\n                          popover-placement=\"right\">\r\n                        <button class=\"btn btn-info\"\r\n                                [disabled]=\"!questionForm.form.valid\"\r\n                                (click)=\"addAnswer()\">\r\n                            Add Answer\r\n                        </button>\r\n                    </span>\r\n                </div>\r\n            </div>\r\n        </fieldset>\r\n    </form>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <button class=\"btn btn-danger\" (click)=\"cancel()\">Close</button>\r\n    <button class=\"btn btn-success\"\r\n            (click)=\"ok()\"\r\n            [disabled]=\"saveIsAvailable(questionForm)\">\r\n        Save Question\r\n    </button>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/quiz/template/question-list.component.html":
/*!************************************************************!*\
  !*** ./src/app/quiz/template/question-list.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Questions -->\r\n<!--question.answers.length-->\r\n<div class=\"form-group\" *ngIf=\"quiz && quiz.questions.length\" >\r\n    <label class=\"col-lg-2 control-label\">Questions</label>\r\n    <div class=\"col-lg-10\">\r\n        <ul class=\"list-group question-list\" name=\"questions\">\r\n            <li class=\"list-group-item clearfix\"\r\n                *ngFor=\"let question of quiz.questions; let i = index \">\r\n                <em class=\"text-info hide-overflow\" [innerHTML]=\"question.title\"\r\n                    (click)=\"openQuesitonMenu(question)\"\r\n                    ngbPopover=\"There are {{question.answers.length}} answers in this question.\" triggers=\"mouseenter:mouseleave\" popoverTitle=\"Question Hint\">\r\n                ></em>\r\n                <span class=\"pull-right button-group\">\r\n                    <button type=\"button\"\r\n                            class=\"btn btn-xs btn-primary\"\r\n                            (click)=\"openQuesitonMenu(question)\">\r\n                        <span class=\"glyphicon glyphicon-edit\"></span> Edit\r\n                    </button>\r\n                    <button type=\"button\"\r\n                            class=\"btn btn-xs btn-danger\"\r\n                            (click)=\"removeQuestion(i)\">\r\n                        <span class=\"glyphicon glyphicon-remove\"></span> Delete\r\n                    </button>\r\n                </span>\r\n            </li>\r\n        </ul>\r\n        <!-- Questions paging -->\r\n        <ngb-pagination class=\"pull-right\" [collectionSize]=\"quiz.questions.length\" [pageSize]=\"pageSize\" [(page)]=\"page\"\r\n                        [maxSize]=\"10\" (pageChange)=\"loadPage($event)\">\r\n        </ngb-pagination>\r\n\r\n        <!--<uib-pagination *ngIf=\"quiz.questions.length > ctrl.pager.pageSize\"\r\n                        class=\"pull-right\"\r\n                        total-items=\"quiz.questions.length\"\r\n                        [(model)]=\"ctrl.pager.currentPage\"\r\n                        items-per-page=\"ctrl.pager.pageSize\"\r\n                        max-size=\"10\"></uib-pagination>-->\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/quiz/template/quiz-edit-info.component.html":
/*!*************************************************************!*\
  !*** ./src/app/quiz/template/quiz-edit-info.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel-body\">\r\n    <form class=\"form-horizontal\"\r\n          novalidate\r\n          #quizForm=\"ngForm\">\r\n        <fieldset>\r\n            <legend>Basic Quiz Information</legend>\r\n            <div class=\"form-group\" \r\n                    [ngClass]=\"{'has-error': (titleVar.touched || \r\n                                              titleVar.dirty || quiz.id !== 0) && \r\n                                              !titleVar.valid }\">\r\n                <label class=\"col-md-2 control-label\" \r\n                        for=\"titleId\">Quiz Name</label>\r\n                <!--Title-->\r\n                <div class=\"col-md-8\">\r\n                    <input class=\"form-control\" \r\n                            id=\"titleId\" \r\n                            type=\"text\" \r\n                            placeholder=\"Name (required)\"\r\n                            required\r\n                            minlength=\"3\"\r\n                            [(ngModel)] = quiz.title\r\n                            name=\"title\"\r\n                            #titleVar=\"ngModel\" />\r\n                    <span class=\"help-block\" *ngIf=\"(titleVar.touched ||\r\n                                                     titleVar.dirty || quiz.id !== 0) &&\r\n                                                     titleVar.errors\">\r\n                        <span *ngIf=\"titleVar.errors.required\">\r\n                            Quiz name is required.\r\n                        </span>\r\n                        <span *ngIf=\"titleVar.errors.minlength\">\r\n                            Quiz name must be at least three characters.\r\n                        </span>\r\n                    </span>\r\n                </div>\r\n            </div>\r\n\r\n            \r\n            \r\n            <!--<div class=\"form-group\" \r\n                    [ngClass]=\"{'has-error': (quizCodeVar.touched || \r\n                                              quizCodeVar.dirty || quiz.id !== 0) && \r\n                                              !quizCodeVar.valid }\">\r\n                <label class=\"col-md-2 control-label\" for=\"quizCodeId\">Quiz Code</label>\r\n\r\n                <div class=\"col-md-8\">\r\n                    <input class=\"form-control\" \r\n                            id=\"quizCodeId\" \r\n                            type=\"text\" \r\n                            placeholder=\"Code (required)\"\r\n                            required\r\n                            [(ngModel)] = quiz.quizCode\r\n                            name=\"quizCode\"\r\n                            #quizCodeVar=\"ngModel\" />\r\n                    <span class=\"help-block\" *ngIf=\"(quizCodeVar.touched ||\r\n                                                     quizCodeVar.dirty || quiz.id !== 0) &&\r\n                                                     quizCodeVar.errors\">\r\n                        <span *ngIf=\"quizCodeVar.errors.required\">\r\n                            Quiz code is required.\r\n                        </span>\r\n                    </span>\r\n                </div>\r\n            </div>-->\r\n\r\n            <!--Description-->\r\n            \r\n            <div class=\"form-group\">\r\n                <label class=\"col-md-2 control-label\" for=\"descriptionId\">Description</label>\r\n\r\n                <div class=\"col-md-8\">\r\n                    <textarea class=\"form-control\" \r\n                            id=\"description\" \r\n                            placeholder=\"Description\"\r\n                            required\r\n                            minlength=\"3\"\r\n                            rows=3\r\n                            [(ngModel)] = quiz.description\r\n                            name=\"description\"\r\n                              #descVar=\"ngModel\"></textarea>\r\n\r\n                    <span class=\"help-block\" *ngIf=\"(descVar.touched ||descVar.dirty || quiz.id !== 0) && descVar.errors\"\r\n                         >\r\n                        <span *ngIf=\"descVar.errors.required\">\r\n                            Quiz name is required.\r\n                        </span>\r\n                        <span *ngIf=\"descVar.errors.minlength\">\r\n                            Write a short description for the quiz.\r\n                        </span>\r\n                    </span>\r\n                </div>\r\n            </div>\r\n\r\n            \r\n            <!-- Private/Public -->\r\n            <div class=\"form-group\">\r\n                <label for=\"access\" class=\"col-lg-2 control-label\">Quiz Access</label>\r\n                <div class=\"btn-group\">\r\n                    <label class=\"btn btn-primary\" [class.active]=\"quiz.isPrivate\">\r\n                        <input type=\"checkbox\" [(ngModel)]=\"quiz.isPrivate\" name=\"isPrivate\"> Private\r\n                    </label>\r\n                    <!--<label class=\"btn btn-primary\">\r\n                        <input type=\"radio\" NgbRadio [value]=\"false\"> Public\r\n                    </label>-->\r\n                    <!--<label class=\"btn btn-primary\">\r\n                        <input type=\"radio\" [value]=\"false\"> Right\r\n                    </label>-->\r\n                </div>\r\n                \r\n            </div>\r\n\r\n            <!-- Answers Shuffle -->\r\n            <div class=\"form-group\">\r\n                <label for=\"suffle\" class=\"col-lg-2 control-label\">Shuffle Answers</label>\r\n                <label class=\"btn btn-primary\" [class.active]=\"quiz.shuffleAnswers\">\r\n                    <input type=\"checkbox\" [(ngModel)]=\"quiz.shuffleAnswers\" name=\"shuffleAnswers\"> Shuffle\r\n                </label>\r\n                <!--<input type=\"radio\" name=\"shuffleAnswers\" [(ngModel)]=\"quiz.shuffleAnswers\" [value]=\"true\">\r\n                <input type=\"radio\" name=\"shuffleAnswers\" [(ngModel)]=\"quiz.shuffleAnswers\" [value]=\"false\">-->\r\n                <!--<div [(ngModel)]=\"quiz.shuffleAnswers\" ngbRadioGroup name=\"shuffleAnswers\">\r\n                    <label class=\"btn btn-primary\">\r\n                        <input type=\"radio\" [value]=\"true\"> Shuffle\r\n                    </label>\r\n                    <label class=\"btn btn-primary\">\r\n                        <input type=\"radio\" [value]=\"false\"> Off\r\n                    </label>\r\n                </div>-->\r\n            </div>\r\n\r\n            <!-- Number Of Questions -->\r\n            <!--{{quiz.questions.length}}-->\r\n            <div class=\"form-group\">\r\n                <label for=\"quizQuestionsCount\" class=\"col-lg-2 control-label\">Questions per Solving</label>\r\n                <div class=\"col-lg-2\">\r\n                    <input type=\"number\" [(ngModel)]=\"quiz.numberOfQuestions\"\r\n                           id=\"quizQuestionsCount\"\r\n                           class=\"form-control\" \r\n                           name=\"quizQuestionsCount\"\r\n                           required min=\"3\" max=\"10\"\r\n                           (focus)=\"questionsCountFocus=true\"\r\n                           (blur)=\"questionsCountFocus=false\">\r\n                </div>\r\n            </div>\r\n\r\n            <button class=\"btn btn-lg btn-outline-primary\" (click)=\"addQuestion()\" [disabled]=\"numOfQxMatch()\">Add Question</button>\r\n\r\n            <!-- Add Question -->\r\n            <div class=\"form-group\">\r\n                <!--due to the ngbd-model needs Bootstrap 4 alpha 6 and to the fact that the new version will break up \r\n                    current project style , we don't want to use it now-->\r\n                <!--<ngbd-modal-basic></ngbd-modal-basic>-->\r\n                <add-question *ngIf=\"showEditQuestion\" [quiz]=\"quiz\" [question]=\"question\" (cancelEditQuestion) =\"handleCancelEditQuestion($event)\"></add-question>\r\n                <!--<div class=\"col-lg-10 col-lg-offset-2\">\r\n                    <span uib-popover=\"{{ctrl.popups.ADD_QUESTIONS}}\"\r\n                          popover-trigger=\"none\"\r\n                          popover-is-open=\"quiz.questions.length < 3 && !modalIsOpen\"\r\n                          popover-placement=\"right\">\r\n                        <button class=\"btn btn-success\" type=\"button\"\r\n                                ng-click=\"ctrl.openQuesitonMenu()\">\r\n                            Add New Question\r\n                        </button>\r\n                    </span>\r\n                </div>-->\r\n            </div>\r\n\r\n            <div class=\"has-error\" *ngIf=\"errorMessage\">{{errorMessage}}</div>\r\n        </fieldset>\r\n    </form>\r\n\r\n    <question-list [quiz]=\"quiz\" (openEditQuestion)=\"handleOpenEditQuestion($event)\" (deleteQuestion)=\"handleDeleteQuestion($event)\"></question-list>\r\n</div>"

/***/ }),

/***/ "./src/app/quiz/template/quiz-edit-tags.component.html":
/*!*************************************************************!*\
  !*** ./src/app/quiz/template/quiz-edit-tags.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel-body\">\r\n    <form class=\"form-horizontal\"\r\n          novalidate>\r\n        <fieldset>\r\n            <legend>Quiz Search Tags</legend>\r\n            <!--<div class=\"form-group\" \r\n                    [ngClass]=\"{'has-error': (categoryVar.touched || \r\n                                              categoryVar.dirty || quiz.id !== 0) && \r\n                                              !categoryVar.valid }\">\r\n                <label class=\"col-md-2 control-label\" for=\"categoryId\">Category</label>\r\n                <div class=\"col-md-8\">\r\n                    <input class=\"form-control\" \r\n                           id=\"categoryId\" \r\n                           type=\"text\"\r\n                           placeholder=\"Category (required)\"\r\n                           required\r\n                          [(ngModel)]=\"quiz.categoryId\"\r\n                           name=\"categoryId\"\r\n                           #categoryVar=\"ngModel\" />\r\n                    <span class=\"help-block\" *ngIf=\"(categoryVar.touched ||\r\n                                                     categoryVar.dirty || quiz.id !== 0) &&\r\n                                                     categoryVar.errors\">\r\n                        <span *ngIf=\"categoryVar.errors.required\">\r\n                            A category must be entered.\r\n                        </span>\r\n                       \r\n                    </span>\r\n                </div>\r\n            </div>-->\r\n\r\n            <!-- Category -->\r\n            <div class=\"form-group\">\r\n                <label for=\"categoryId\" class=\"col-lg-2 control-label\">Category</label>\r\n                <div class=\"col-lg-10\">\r\n                    <input id=\"categoryName\" type=\"text\" class=\"form-control\" name=\"categoryName\"\r\n                           [(ngModel)]=\"quiz.category\" \r\n                           [ngbTypeahead]=\"search\" \r\n                           [resultFormatter]=\"formatter\"\r\n                           [inputFormatter]=\"inputformatter\"\r\n                           #categoryVar=\"ngModel\"\r\n                           (selectItem)=\"selectedItem($event)\"  />\r\n                    \r\n                    <span class=\"help-block\" *ngIf=\"(categoryVar.touched ||\r\n                                                     categoryVar.dirty || quiz.id !== 0) &&\r\n                                                     categoryVar.errors\">\r\n                        <span *ngIf=\"categoryVar.errors.required\">\r\n                            A category must be entered.\r\n                        </span>\r\n                        \r\n                    </span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"form-group\" \r\n                    [ngClass]=\"{'has-error': (tagVar.touched || \r\n                                              tagVar.dirty || quiz.id !== 0) && \r\n                                              !tagVar.valid }\">\r\n                <label class=\"col-md-2 control-label\" for=\"tagsId\">Search Tags</label>\r\n                <div class=\"col-md-8\">\r\n                    <input class=\"form-control\" \r\n                           id=\"tagsId\" \r\n                           type=\"text\"\r\n                           placeholder=\"Search keywords separated by commas\"\r\n                           minlength=\"3\"\r\n                           [(ngModel)]=\"newTags\"\r\n                           name=\"tags\"\r\n                           #tagVar=\"ngModel\" />\r\n                    <span class=\"help-block\" *ngIf=\"(tagVar.touched ||\r\n                                                     tagVar.dirty || quiz.id !== 0) &&\r\n                                                     tagVar.errors\">\r\n                        <span *ngIf=\"tagVar.errors.minlength\">\r\n                            The search tag must be at least 3 characters in length.\r\n                        </span>\r\n                    </span>\r\n                </div>\r\n                <div class=\"col-md-1\">\r\n                    <button type=\"button\"\r\n                            class=\"btn btn-default\"\r\n                            (click)=\"addTags()\">\r\n                        Add\r\n                    </button>\r\n                </div>\r\n            </div>\r\n            <div class=\"row col-md-8 col-md-offset-2\">\r\n                <span *ngFor=\"let tag of quiz.tags; let i = index\">\r\n                    <button class=\"btn btn-default\"\r\n                            style=\"font-size:smaller;margin-bottom:12px\"\r\n                            (click)=\"removeTag(i)\">\r\n                        {{tag}}\r\n                        <span class=\"glyphicon glyphicon-remove\"></span>\r\n                    </button>\r\n                </span>\r\n            </div>\r\n            <div class=\"has-error\" *ngIf=\"errorMessage\">{{errorMessage}}</div>\r\n        </fieldset>\r\n    </form>\r\n</div>"

/***/ }),

/***/ "./src/app/quiz/template/quiz-edit.component.html":
/*!********************************************************!*\
  !*** ./src/app/quiz/template/quiz-edit.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-primary\">\r\n    <div class=\"panel-heading\">\r\n        {{pageTitle}}\r\n    </div>\r\n\r\n    <div class=\"panel-body\" *ngIf=\"quiz\">\r\n        <div class=\"wizard\">\r\n            <a [routerLink]=\"['info']\" routerLinkActive=\"active\">\r\n                Basic Information <span [ngClass]=\"{'glyphicon glyphicon-exclamation-sign': !isValid('info')}\"></span>\r\n            </a>\r\n            <a [routerLink]=\"['tags']\" routerLinkActive=\"active\">\r\n                Search Tags <span [ngClass]=\"{'glyphicon glyphicon-exclamation-sign': !isValid('tags')}\"></span>\r\n            </a>\r\n        </div>\r\n\r\n        <router-outlet></router-outlet>\r\n    </div>\r\n\r\n    <div class=\"panel-footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6 col-md-offset-2\">\r\n                <span>\r\n                    <button class=\"btn btn-primary\"\r\n                            type=\"button\"\r\n                            style=\"width:80px;margin-right:10px\"\r\n                           [disabled]=\"!isValid()\"\r\n                            (click)=\"saveQuiz()\">\r\n                        Save\r\n                    </button>\r\n                    <!--[disabled]=\"!isValid()\"-->\r\n                </span>\r\n                <span>\r\n                    <a class=\"btn btn-default\"\r\n                        [routerLink]=\"['/quizs']\">\r\n                        Cancel\r\n                    </a>\r\n                </span>\r\n                <span>\r\n                    <a class=\"btn btn-default\"\r\n                        (click)=\"deleteQuiz()\">\r\n                        Delete\r\n                    </a>\r\n                </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"has-error\" *ngIf=\"errorMessage\">{{errorMessage}}</div>\r\n</div>"

/***/ }),

/***/ "./src/app/quiz/template/quiz-list.component.html":
/*!********************************************************!*\
  !*** ./src/app/quiz/template/quiz-list.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<article>\r\n    <h4>Quiz List from quiz-list.component.html</h4>\r\n    <ul class=\"quizs\" >\r\n        <li *ngFor=\"let quiz of quizs\" >\r\n            <a href=\"\" [routerLink]=\"['/quizs', quiz.id]\">\r\n                {{quiz.id}}. {{quiz.title}} ({{quiz.description}})\r\n            </a>\r\n            <a class=\"btn btn-primary\" href=\"\" [routerLink]=\"['/quizs', quiz.id, 'edit']\">Edit</a>\r\n            <a class=\"btn btn-primary\" href=\"\" [routerLink]=\"['/quizs', quiz.id]\">Solve</a>\r\n            \r\n        </li>\r\n    </ul>\r\n</article>\r\n\r\n<article >\r\n    <!--<edit-quiz (savedQuiz)=\"handleSavedQuiz($event)\"></edit-quiz>-->\r\n    <router-outlet (activated)=\"handleSavedQuiz($event)\"></router-outlet>\r\n    <h2>without the activated attribute</h2>\r\n    <router-outlet></router-outlet>\r\n</article>"

/***/ }),

/***/ "./src/app/quiz/template/quiz-result.component.html":
/*!**********************************************************!*\
  !*** ./src/app/quiz/template/quiz-result.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n    <h1 class=\"text-center\">{{GetSuccessPercentage()}}%</h1>\r\n    <div class=\"col-md-6\">\r\n        <h2 class=\"text-center\">You Answered Correctly</h2>\r\n       \r\n        <div *ngFor=\"let q of quizEval?.correctlyAnswered\">\r\n            <div class=\"questions-container\">\r\n                <div class=\"panel panel-primary\">\r\n                    <div class=\"panel-heading\">\r\n                        <h3 class=\"panel-title text-center\">{{q.question}}</h3>\r\n                    </div>\r\n                    <div class=\"panel-body list-group\">\r\n                        <a class=\"list-group-item answer\">\r\n                            <span>{{q.correctAnswer}}</span>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <h2 class=\"text-center\">You Answered Incorrectly</h2>\r\n        <div *ngFor=\"let q of quizEval?.incorrectlyAnswered\">\r\n            <div class=\"questions-container\">\r\n                <div class=\"panel panel-primary\">\r\n                    <div class=\"panel-heading\">\r\n                        <h3 class=\"panel-title text-center\">{{q.question}}</h3>\r\n                    </div>\r\n                    <div class=\"panel-body list-group\">\r\n                        <a href class=\"list-group-item answer\">\r\n                            <label>You Selected:</label>\r\n                            <span>{{q.selectedAnswer}}</span>\r\n                        </a>\r\n                        <a href class=\"list-group-item answer\">\r\n                            <label>Correct Answer Is:</label>\r\n                            <span>{{q.correctAnswer}}</span>\r\n                        </a>\r\n                        <div *ngIf=\"q.resultDescription\">\r\n                            <p class=\"list-group-item description\">\r\n                                {{q.resultDescription}}\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            }\r\n        </div>\r\n</div>\r\n</div>\r\n<article>\r\n    <router-outlet></router-outlet>\r\n</article>\r\n"

/***/ }),

/***/ "./src/app/quiz/template/solve-quiz.component.html":
/*!*********************************************************!*\
  !*** ./src/app/quiz/template/solve-quiz.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"carousel-container\">\r\n    <div class=\"indicators\">\r\n        <p>My Progress bar goes here...</p>\r\n        <ngbd-progressbar-showvalue [completedToPass] = \"questionsAnswered\" [totalToPass] =\"questionsCount\"></ngbd-progressbar-showvalue>\r\n        <div class=\"bb-custom-wrapper\">\r\n            <div id=\"bb-blockbook\" class=\"bb-bookblock\">\r\n                <div class=\"bb-item2\" *ngFor=\"let question of questions; let i = index\" >\r\n                    <article *ngIf=\"page == i + 1\" >\r\n                        <h3 class=\"slide-title\">{{question?.title}}</h3>\r\n                        <ol class=\"answers paper list-group\">\r\n                            <li *ngFor=\"let answer of question?.answers; let i = index\"\r\n                                class=\"answer list-group-item\"\r\n                                [class.answered]=\"highlightAnswer[i]\"\r\n                                (click)=\"selectAnswer(question, i)\">\r\n                                <span [class.selected]=\"question.selectedAnswer === i\">{{answer.text}}</span>\r\n                            </li>\r\n                        </ol>\r\n                    </article>\r\n                </div>\r\n            </div>\r\n        </div> \r\n            <ngb-pagination [collectionSize]=\"questions.length\" [pageSize]=\"1\" [(page)]=\"page\" [maxSize]=\"7\" (pageChange)=\"loadPage($event)\">\r\n            </ngb-pagination>\r\n\r\n            <!-- <nav>\r\n                <a id=\"bb-nav-first\" href=\"#\" class=\"bb-custom-icon\">First page</a>\r\n                <a id=\"bb-nav-prev\" href=\"#\" class=\"bb-custom-icon\">Previous</a>\r\n                <a id=\"bb-nav-next\" href=\"#\" class=\"bb-custom-icon\">Next</a>\r\n                <a id=\"bb-nav-last\" href=\"#\" class=\"bb-custom-icon\">Last page</a>\r\n              </nav> -->\r\n            <!--<ngbd-pagination-basic></ngbd-pagination-basic>-->\r\n            <!--<uib-pagination class=\"questions-paging\"\r\n            direction-links=\"false\"\r\n            boundary-links=\"true\"\r\n            items-per-page=\"ctrl.pager.pageSize\"\r\n            total-items=\"ctrl.questionsCount\"\r\n            max-size=\"7\"\r\n            ng-model=\"ctrl.pager.currentPage\"\r\n            ng-change=\"ctrl.flip(ctrl.pager.currentPage)\"></uib-pagination>-->\r\n            <!--<div class=\"bb-custom-wrapper\">\r\n        <div id=\"bb-blockbook\" class=\"bb-bookblock\">\r\n            <div class=\"bb-item\" ng-repeat=\"question in ctrl.quiz.Questions\">\r\n                <article class=\"quiz-question\" ng-include=\"ctrl.questionTemplate\"></article>\r\n            </div>\r\n        </div>-->\r\n            <div class=\"wrapper\">\r\n                <button id=\"solve-quiz\"\r\n                        *ngIf=\"progress() === 100\"\r\n                        (click)=\"submit(quiz)\"\r\n                        class=\"btn btn-lg btn-info col-md-offset-3 col-md-6\">\r\n                    Submit Answers\r\n                </button>\r\n            </div>\r\n        </div>\r\n    \r\n</div>\r\n<article>\r\n    <div *ngIf=\"quizSolution\">\r\n        <solution-area [solution]=\"quizSolution\"></solution-area>\r\n    </div>\r\n</article>\r\n"

/***/ }),

/***/ "./src/app/rxjs-extensions.ts":
/*!************************************!*\
  !*** ./src/app/rxjs-extensions.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
__webpack_require__(/*! rxjs/add/operator/delay */ "./node_modules/rxjs-compat/_esm5/add/operator/delay.js");
__webpack_require__(/*! rxjs/add/operator/do */ "./node_modules/rxjs-compat/_esm5/add/operator/do.js");
__webpack_require__(/*! rxjs/add/operator/finally */ "./node_modules/rxjs-compat/_esm5/add/operator/finally.js");
__webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
__webpack_require__(/*! rxjs/add/operator/mergeMap */ "./node_modules/rxjs-compat/_esm5/add/operator/mergeMap.js");
__webpack_require__(/*! rxjs/add/operator/toPromise */ "./node_modules/rxjs-compat/_esm5/add/operator/toPromise.js");
__webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
__webpack_require__(/*! rxjs/add/observable/fromPromise */ "./node_modules/rxjs-compat/_esm5/add/observable/fromPromise.js");
__webpack_require__(/*! rxjs/add/observable/throw */ "./node_modules/rxjs-compat/_esm5/add/observable/throw.js");


/***/ }),

/***/ "./src/app/shared/css/star.component.css":
/*!***********************************************!*\
  !*** ./src/app/shared/css/star.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".crop {\r\n    overflow: hidden;\r\n}\r\n\r\ndiv {\r\n    cursor: pointer;\r\n}"

/***/ }),

/***/ "./src/app/shared/data/autoid-generator.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/data/autoid-generator.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AutoIDGenerator = /** @class */ (function () {
    function AutoIDGenerator(storageKey) {
        this.storageKey = storageKey;
    }
    AutoIDGenerator.prototype.GetAutoID = function () {
        // read current last used value
        var curr = Number(localStorage.getItem(this.storageKey + '-AutoID'));
        if (curr === 0) {
            curr = 0; // don't start at 1.  Instead start with a negative number
        }
        curr -= 1;
        // save for future
        localStorage.setItem(this.storageKey + '-AutoID', curr.toString());
        // return value
        return curr;
    };
    return AutoIDGenerator;
}());
exports.AutoIDGenerator = AutoIDGenerator;


/***/ }),

/***/ "./src/app/shared/focused-input.directive.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/focused-input.directive.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var FocusedInputDirective = /** @class */ (function () {
    function FocusedInputDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    FocusedInputDirective.prototype.ngOnInit = function () {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
    };
    FocusedInputDirective = __decorate([
        core_1.Directive({
            selector: 'input'
        }),
        __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
    ], FocusedInputDirective);
    return FocusedInputDirective;
}());
exports.FocusedInputDirective = FocusedInputDirective;


/***/ }),

/***/ "./src/app/shared/shared-service.ts":
/*!******************************************!*\
  !*** ./src/app/shared/shared-service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var Subject_1 = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var SharedService = /** @class */ (function () {
    function SharedService() {
        // Observable string sources
        this.emitChangeSource = new Subject_1.Subject();
        // Observable string streams
        this.changeEmitted$ = this.emitChangeSource.asObservable();
    }
    // Service message commands
    SharedService.prototype.emitChange = function (change) {
        this.emitChangeSource.next(change);
    };
    SharedService = __decorate([
        core_1.Injectable()
    ], SharedService);
    return SharedService;
}());
exports.SharedService = SharedService;


/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var star_component_1 = __webpack_require__(/*! ./star.component */ "./src/app/shared/star.component.ts");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                star_component_1.StarComponent
            ],
            declarations: [star_component_1.StarComponent],
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;


/***/ }),

/***/ "./src/app/shared/star.component.ts":
/*!******************************************!*\
  !*** ./src/app/shared/star.component.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var StarComponent = /** @class */ (function () {
    function StarComponent() {
        this.ratingClicked = new core_1.EventEmitter();
    }
    StarComponent.prototype.ngOnChanges = function () {
        // Convert x out of 5 starts
        // to y out of 86px width
        this.starWidth = this.rating * 86 / 5;
    };
    StarComponent.prototype.onClick = function () {
        this.ratingClicked.emit("The rating " + this.rating + " was clicked!");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], StarComponent.prototype, "rating", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StarComponent.prototype, "ratingClicked", void 0);
    StarComponent = __decorate([
        core_1.Component({
            selector: 'ai-star',
            template: __webpack_require__(/*! ./template/star.component.html */ "./src/app/shared/template/star.component.html"),
            styles: [__webpack_require__(/*! ./css/star.component.css */ "./src/app/shared/css/star.component.css")]
        })
    ], StarComponent);
    return StarComponent;
}());
exports.StarComponent = StarComponent;


/***/ }),

/***/ "./src/app/shared/template/star.component.html":
/*!*****************************************************!*\
  !*** ./src/app/shared/template/star.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"crop\" \r\n    [style.width.px]=\"starWidth\"\r\n    [title]=\"rating\"\r\n    (click)='onClick()'>\r\n    <div style=\"width: 86px\">\r\n        <span class=\"glyphicon glyphicon-star\"></span>\r\n        <span class=\"glyphicon glyphicon-star\"></span>\r\n        <span class=\"glyphicon glyphicon-star\"></span>\r\n        <span class=\"glyphicon glyphicon-star\"></span>\r\n        <span class=\"glyphicon glyphicon-star\"></span>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/toastr.service.ts":
/*!******************************************!*\
  !*** ./src/app/shared/toastr.service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
exports.TOASTR_TOKEN = new core_1.InjectionToken('toastr');


/***/ }),

/***/ "./src/app/styles/less/index.css":
/*!***************************************!*\
  !*** ./src/app/styles/less/index.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ranking-controls {\n  padding-bottom: 5rem;\n}\n.absolute-center {\n  margin: auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n}\n@font-face {\n  font-family: 'Droid Sans';\n  src: url('/fonts/DroidSans.ttf');\n  src: url('/fonts/DroidSans-Bold.ttf') format('bold');\n}\n@font-face {\n  font-family: 'Colaborate Thin';\n  src: url('/fonts/ColabThi.otf');\n}\n.btn-grad {\n  background-color: #000000;\n  background-image: linear-gradient(180deg, #323a43, #000000);\n}\n.pageTextShadow {\n  text-shadow: 1px 1px 1px white;\n}\n.pageTitleShadow {\n  text-shadow: 1px 1px 1px black;\n}\n@-webkit-keyframes neon-glow {\n  0% {\n    text-shadow: 0 0 0 #242f3c;\n  }\n  50% {\n    text-shadow: 0 0 3px #242f3c;\n  }\n  100% {\n    text-shadow: 0 0 0 #242f3c;\n  }\n}\n@keyframes neon-glow {\n  0% {\n    text-shadow: 0 0 0 #242f3c;\n  }\n  50% {\n    text-shadow: 0 0 3px #242f3c;\n  }\n  100% {\n    text-shadow: 0 0 0 #242f3c;\n  }\n}\n.btn {\n  color: white;\n  border: 1px solid #000 !important;\n  border-radius: 5px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);\n  text-shadow: none;\n  transition: 0.25s;\n}\n.btn:focus {\n  background-position: 0;\n  color: inherit;\n}\n.btn:hover {\n  border-color: #333333 !important;\n  background-position: 0;\n}\n.btn-primary,\n.btn-quiz {\n  background-color: #000000;\n  background-image: linear-gradient(180deg, #323a43, #000000);\n}\n.btn-primary:hover,\n.btn-quiz:hover {\n  background-color: #3e4c5a;\n  background-image: linear-gradient(0deg, #53606f, #262626);\n}\n.btn-primary[disabled],\n.btn-quiz[disabled] {\n  background-color: #536678;\n  background-image: linear-gradient(0deg, #68798c, #404040);\n}\n.btn-primary[disabled]:hover,\n.btn-quiz[disabled]:hover {\n  background: #888;\n}\n.btn-round {\n  border-radius: 20px;\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.7);\n}\n.btn-round:hover {\n  color: white;\n}\n.btn-danger {\n  background-color: #362e27;\n}\n.btn-success {\n  background-color: #28382f;\n}\n.btn-info {\n  background-color: #332838;\n}\n.btn-info:hover,\n.btn-info:focus,\n.btn-info:active,\n.btn-info:target {\n  background-color: #614c6b !important;\n}\n.btn-info[disabled] {\n  background-color: #91769d;\n}\n.btn-info[disabled]:hover {\n  background: #888;\n}\n.btn-google {\n  background-image: url(\"/Content/images/google-btn.jpg\");\n  background-size: 100%;\n  background-repeat: no-repeat;\n  background-position-y: -7px;\n  width: 134px;\n  height: 62px;\n}\n.fb-share {\n  background-color: #395b9b;\n}\n.form-horizontal legend {\n  font-weight: normal;\n}\n.form-group .toggle-switch,\n.form-group a {\n  text-shadow: none;\n}\n.form-group .toggle-switch .switch-left {\n  background-color: #000000;\n}\n.form-group .dropdown .dropdown-menu li a {\n  background: #323a43;\n  color: #a6a6a6;\n}\n.form-group .dropdown .dropdown-menu li a:hover,\n.form-group .dropdown .dropdown-menu li a:focus {\n  color: #cccccc;\n  background-color: #3e4c5a;\n  background-image: linear-gradient(0deg, #53606f, #262626);\n}\n.form-group.required .control-label:after {\n  content: \"*\";\n  color: #ff4d00;\n}\n.content {\n  position: relative;\n  padding: 0 1rem;\n  border: 1px solid #fff;\n  border-left: 0;\n  border-right: 0;\n  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.7);\n  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.7), 0 10px 20px rgba(0, 0, 0, 0.7);\n  box-shadow: inset 0 10px 15px rgba(0, 0, 0, 0.25), inset 0 -10px 15px rgba(0, 0, 0, 0.25);\n  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.7), 0 10px 20px rgba(0, 0, 0, 0.7), inset 0 10px 15px rgba(0, 0, 0, 0.25), inset 0 -10px 15px rgba(0, 0, 0, 0.25);\n  background-image: url('/Content/images/content-bg.png');\n  background-repeat: repeat;\n}\n.wrapper {\n  max-width: 960px;\n  margin: 0 auto;\n}\n.panel.panel-primary .panel-heading {\n  background-image: linear-gradient(180deg, #3e4852, #323b44);\n}\n.nav-container {\n  background-color: #323b44;\n  background-image: linear-gradient(180deg, #3e4852, #323b44);\n  border-radius: 10px;\n  border-top: 1px solid #4e5c6a;\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.08);\n  padding: 0 2.5rem;\n}\n.quiz-tooltip {\n  color: #838383;\n}\n.category-dropdown {\n  cursor: pointer;\n}\n.answer-mark {\n  cursor: pointer;\n}\n.answer-mark a {\n  color: #1f262d;\n}\n.form-group label.correct .fa-check {\n  position: absolute;\n  font-size: 30px;\n  color: #0B9900;\n  left: 21px;\n  top: 3px;\n}\n.questions-paging .pagination-page {\n  text-shadow: none;\n  margin: 0 0.25rem;\n  display: inline-block;\n}\n.questions-paging .pagination-page.active a {\n  background: #000000;\n}\n.questions-paging .pagination-page a {\n  border-radius: 5px;\n}\n.question-list {\n  margin-bottom: 1rem;\n}\n.question-list .text-info {\n  cursor: pointer;\n}\n.widget .categories ul {\n  list-style: none;\n  width: auto;\n}\n.widget .categories ul li {\n  position: relative;\n  margin: 0.5rem 0;\n}\n.widget .categories ul li img {\n  margin-right: 0.5rem;\n}\n.widget > h3 {\n  margin-top: 0;\n  font-family: \"Colaborate Thin\", monospace;\n}\n.widget .well {\n  padding: 2.8rem;\n  border-radius: 15px;\n  background-image: linear-gradient(white 75%, #f7f7f7);\n}\n.widget .well .user-avatar {\n  cursor: pointer;\n  margin-bottom: 5px;\n}\n.widget .well > ul {\n  padding-left: 1rem;\n  list-style: none;\n}\n.widget .well > ul li {\n  margin-top: 2rem;\n}\n.widget .well > ul li h4 {\n  text-shadow: none;\n  font-weight: bold;\n}\n.widget .well .solutions-counter {\n  color: #3e4c5a;\n}\n.single-article {\n  position: relative;\n  background-image: radial-gradient(ellipse 15rem 1.5rem at 10rem 0, rgba(0, 0, 0, 0.07) 0%, rgba(0, 0, 0, 0) 100%);\n}\n.single-article:before,\n.single-article:after {\n  display: block;\n  position: absolute;\n  width: 75%;\n  left: -1rem;\n  content: \"\";\n  height: 1px;\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, #c4c4c4 5%, #c4c4c4 55%, rgba(0, 0, 0, 0) 100%);\n}\n.single-article:after {\n  top: 1px;\n  background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #ffffff 20%, #ffffff 50%, rgba(255, 255, 255, 0) 80%);\n}\n.single-article .article-header h4 {\n  color: #505050;\n}\n.single-article .article-body {\n  margin-top: 1.5rem;\n}\n@media only screen and (min-width: 700px) {\n  .single-article .article-body {\n    padding-right: 6rem;\n  }\n}\n.single-article .article-body .basic-info span {\n  color: #1f262d;\n}\n.single-article .article-body .basic-info .btn-danger {\n  color: #fff;\n  margin-right: 0.5rem;\n}\n.single-article .article-body .article-content {\n  width: 67%;\n  padding-left: 2rem;\n}\n.single-article .article-body .article-content p {\n  margin-bottom: 0.5rem;\n}\n.single-article .article-body .article-content .description p {\n  font-size: 12px;\n}\n.single-article .article-body .article-image {\n  position: relative;\n  max-width: 32%;\n  background-color: #c4c4c4;\n  border: 1px solid #dbdbdb;\n  border-bottom-color: #b7b7b7;\n}\n.single-article .article-body .article-image:before {\n  content: \"\";\n  position: absolute;\n  top: 5px;\n  left: 5px;\n  right: 5px;\n  bottom: 5px;\n  box-shadow: inset 3px 3px 5px rgba(0, 0, 0, 0.43);\n}\n.single-article .article-body .article-image > img {\n  border: 5px solid white;\n}\n.modal-avatar-container {\n  margin: 0 auto;\n}\n.modal-avatar-container .user-avatar {\n  position: relative;\n  cursor: pointer;\n  width: 33%;\n  min-height: 200px;\n  float: left;\n  box-sizing: border-box;\n}\n.modal-avatar-container .user-avatar > img {\n  width: 100%;\n  margin: auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n}\n.modal-avatar-container .user-avatar > img.selected {\n  background: rgba(0, 0, 0, 0.05);\n}\n.page .current-route {\n  margin: 2.5rem 0 4rem;\n  font-size: 12px;\n}\n.page .current-route a {\n  color: #516375;\n  transition: color linear 0.3s;\n}\n.page .current-route a:hover {\n  color: #337ab7;\n}\n.page .current-route .sub-title {\n  padding: 1rem 0 0;\n  margin-bottom: 0;\n  color: #1f262d;\n  font-weight: normal;\n  text-shadow: 1px 1px 1px white;\n}\n.quiz-item {\n  margin-bottom: 4rem;\n}\n.quiz-item h1 {\n  font-size: 2em;\n}\n.quiz-item h2 {\n  font-size: 1.6em;\n}\n.quiz-item a.btn {\n  color: white;\n}\n.quiz-item .quiz-controls {\n  margin-top: 2rem;\n}\n.quiz-item .quiz-controls a,\n.quiz-item .quiz-controls input {\n  margin-left: 1rem;\n}\n.quiz-item .quiz-details .basic-info .text-left,\n.quiz-item .quiz-details .basic-info .text-right {\n  width: 50%;\n}\n.quiz-item .quiz-details .rating {\n  color: rgba(50, 58, 67, 0.5);\n}\n.quiz-item .quiz-details .rating .glyphicon-ok-sign {\n  color: #323a43;\n}\n#main-wrapper .navbar.navbar-inverse {\n  border: 0;\n  background: inherit;\n}\n#main-wrapper .navbar.navbar-inverse ul {\n  *zoom: 1;\n  margin: 0;\n  padding: 0;\n}\n#main-wrapper .navbar.navbar-inverse ul:before,\n#main-wrapper .navbar.navbar-inverse ul:after {\n  content: \"\";\n  display: table;\n}\n#main-wrapper .navbar.navbar-inverse ul:after {\n  clear: both;\n}\n#main-wrapper .navbar.navbar-inverse ul .dropdown:hover ul {\n  max-height: 1000px;\n  -webkit-transform: perspective(400) rotate3d(0, 0, 0, 0);\n}\n#main-wrapper .navbar.navbar-inverse ul .dropdown:hover ul li:first-child {\n  border-top: 1px solid #2e363e;\n}\n#main-wrapper .navbar.navbar-inverse a {\n  color: #fff;\n  padding: 1.5rem 1rem;\n  display: block;\n}\n#main-wrapper .navbar.navbar-inverse a:hover,\n#main-wrapper .navbar.navbar-inverse a a.selected {\n  color: #8d96a0;\n  background: inherit;\n  text-decoration: none;\n}\n#main-wrapper .navbar.navbar-inverse li ul {\n  background-color: #323b44;\n  position: absolute;\n  z-index: 200;\n  max-height: 0;\n  overflow: hidden;\n  -webkit-transform: perspective(400) rotate3d(1, 0, 0, -90deg);\n  -webkit-transform-origin: 50% 0;\n          transform-origin: 50% 0;\n  transition: 350ms;\n  border-left: 1px solid #485561;\n  border-radius: 0 0 15px 15px;\n  box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.62);\n}\n#main-wrapper .navbar.navbar-inverse li ul a {\n  border: none;\n}\n#main-wrapper .navbar.navbar-inverse li ul a:hover {\n  background: rgba(0, 0, 0, 0.2);\n}\n#main-wrapper .navbar.navbar-inverse li ul li {\n  width: 18rem;\n}\n#main-wrapper .navbar.navbar-inverse .container-fluid li.dropdown:hover .dropdown-menu {\n  display: block;\n}\n#main-wrapper .navbar.navbar-inverse .container-fluid li.dropdown .dropdown-menu {\n  display: none;\n  background-color: #323b44;\n  margin-top: 0;\n  padding: 0 3rem 2rem;\n  width: 22rem;\n  border: 0;\n  border-left: 1px solid #485561;\n  border-radius: 0 0 15px 15px;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.62);\n}\n#main-wrapper .navbar.navbar-inverse .container-fluid li.dropdown .dropdown-menu a {\n  padding: 1rem 0;\n}\n.bb-custom-wrapper .bb-bookblock .bb-item {\n  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.62);\n  height: auto;\n}\n.bb-custom-wrapper .bb-bookblock .bb-item::before,\n.bb-custom-wrapper .bb-bookblock .bb-item::after {\n  z-index: -1;\n  position: absolute;\n  content: \"\";\n  bottom: 20px;\n  left: 8px;\n  width: 50%;\n  top: 70%;\n  background: rgba(0, 0, 0, 0.62);\n  box-shadow: 0 30px 10px rgba(0, 0, 0, 0.7);\n  -webkit-transform: skewY(175deg);\n  transform: skewY(175deg);\n}\n.bb-custom-wrapper .bb-bookblock .bb-item::after {\n  -webkit-transform: skewY(5deg);\n  transform: skewY(5deg);\n  right: 8px;\n  left: auto;\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .slide-title {\n  z-index: 10;\n  position: relative;\n  width: 100%;\n  max-height: 8rem;\n  margin: 0;\n  text-align: center;\n  color: #fff;\n  border-left: 1px solid #fff;\n  padding: 1.5rem 1rem;\n  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.62), #1F272F 90%);\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .slide-title::before,\n.bb-custom-wrapper .bb-bookblock .quiz-question .slide-title::after {\n  z-index: 5;\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 1px;\n  background-image: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.5));\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .slide-title::before {\n  top: 0;\n  width: 100%;\n  background-image: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.5));\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .slide-title::after {\n  right: 0;\n  bottom: 0;\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .paper {\n  position: relative;\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .paper:before {\n  content: '';\n  position: absolute;\n  width: 0px;\n  top: 0;\n  left: 4.5rem;\n  bottom: 0;\n  border-left: 1px solid #F8D3D3;\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .answers {\n  font-family: \"Droid Sans\", sans-serif;\n  position: relative;\n  width: 98%;\n  margin: 0.5rem auto;\n  font-size: 2rem;\n  list-style: none;\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .answers .answer {\n  display: list-item;\n  padding-left: 5rem;\n  cursor: pointer;\n  background-color: white;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.4);\n  color: #333;\n  font-family: \"Colaborate Thin\", monospace;\n  background-image: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5));\n  position: relative;\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .answers .answer:before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 4.5rem;\n  bottom: 0;\n  border-left: 1px solid #F8D3D3;\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .answers .answer span.selected {\n  text-decoration: underline;\n}\n.bb-custom-wrapper .bb-bookblock .quiz-question .answers .answer span.selected:before {\n  font: normal normal normal 24px/1 FontAwesome;\n  color: #0B9900;\n  content: \"\\f00c \";\n  position: absolute;\n  left: 1rem;\n  top: 1rem;\n}\n@media (max-width: 660px) {\n  .bb-bookblock {\n    width: 98% !important;\n  }\n}\n@media (min-width: 661px) {\n  .bb-bookblock {\n    width: 71% !important;\n  }\n}\nbody {\n  position: relative;\n  font-family: \"Droid Sans\", sans-serif;\n  background-color: #11161c;\n  /*padding-top: 60px;*/\n}\na {\n  color: #fff;\n}\na:hover,\na a.selected {\n  color: #8d96a0;\n}\na.home-link {\n  font-style: italic;\n  font-family: georgia, serif;\n}\n#main-wrapper header #logo {\n  margin-bottom: 3rem;\n}\n#content-wrapper {\n  margin-top: 6rem;\n  padding: 0;\n  width: 100%;\n}\n#content-wrapper h2.page-heading {\n  color: #fff;\n  font-family: \"Colaborate Thin\", monospace;\n}\n.footer-base {\n  position: relative;\n  color: #fff;\n  background-color: #11161c;\n}\n.footer-base .illumination {\n  width: 100%;\n  height: 80%;\n  top: 0;\n  left: 0;\n}\n.footer-base .description {\n  margin-bottom: 6rem;\n}\n.illumination {\n  position: absolute;\n  background-image: radial-gradient(circle farthest-corner at top center, rgba(255, 255, 255, 0.95) 20%, rgba(255, 255, 255, 0.25) 49%, rgba(255, 255, 255, 0.02) 66%, transparent 70%);\n  mix-blend-mode: soft-light;\n}\n#main-illumination {\n  width: 100%;\n  height: 52rem;\n  top: 0;\n  left: 0;\n  z-index: -1;\n}\n.action-notification {\n  position: fixed;\n  top: 10%;\n  left: 25%;\n  right: 25%;\n  z-index: 1000;\n  text-align: center;\n}\n.page {\n  color: #a3a3a3;\n  text-shadow: 1px 1px 1px white;\n}\n.page a {\n  color: #1f262d;\n  text-decoration: none;\n}\n.page a:hover {\n  color: #687f97;\n}\n.page .content {\n  margin-top: 1rem;\n}\n.page .content h2 {\n  margin-top: 0;\n  color: #1f262d;\n  text-shadow: none;\n}\n.page .content > .wrapper {\n  padding-bottom: 4rem;\n}\n.page .container-fluid {\n  padding: 0;\n}\n.page h2,\n.page h3,\n.page h4 {\n  font-family: \"Colaborate Thin\", monospace;\n  color: white;\n  text-shadow: 1px 1px 1px black;\n}\n.page .sub-title {\n  padding: 1rem 0 0;\n  margin-bottom: 0;\n  color: #1f262d;\n  font-weight: normal;\n  text-shadow: 1px 1px 1px white;\n}\n.page .main-content {\n  float: left;\n  padding: 0 1rem 1rem 0;\n}\n.page .side-content {\n  float: left;\n  padding: 0 0 1rem 1rem;\n  color: #5e5e5e;\n  font-size: 1.2rem;\n}\n.end-line::before {\n  content: \"\";\n  width: 100%;\n  height: 20px;\n  background-image: url(\"/Content/images/border-right-shadow-lighter.png\");\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position-x: 100%;\n}\n.pager li {\n  display: inline-block;\n  text-shadow: none;\n  vertical-align: bottom;\n}\n.pager .counter {\n  margin-right: 2rem;\n}\n.pager .counter label {\n  font-family: \"Colaborate Thin\", monospace;\n  font-weight: normal;\n  color: #838383;\n  text-shadow: 1px 1px 0 #fff;\n}\n.pager .pagination {\n  float: right;\n}\n.pager .pagination-page.active a {\n  background: #000000;\n}\n.pager .pagination-page a {\n  border-radius: 5px;\n}\n.language {\n  z-index: 10;\n}\n@media only screen and (max-width: 700px) {\n  .side-content {\n    display: none;\n  }\n  .main-content {\n    width: 100%;\n  }\n}\n@media only screen and (min-width: 701px) {\n  .main-content {\n    width: 70%;\n  }\n  .side-content {\n    width: 30%;\n  }\n}\n.read-more-state {\n  display: none;\n}\n.read-more-target {\n  opacity: 0;\n  max-height: 0;\n  font-size: 0;\n  transition: .25s ease;\n}\n.read-more-state:checked ~ .read-more-wrap .read-more-target {\n  opacity: 1;\n  font-size: inherit;\n  max-height: 999em;\n}\n.read-more-state ~ .read-more-trigger:before {\n  content: 'Read More';\n}\n.read-more-state:checked ~ .read-more-trigger:before {\n  content: 'Read Less';\n}\n.read-more-trigger {\n  float: right;\n  cursor: pointer;\n  display: inline-block;\n  padding: 0.25em 1.25em;\n  color: #111;\n  border: 1px solid #ebeaea;\n  border-radius: 1em;\n  font-weight: normal;\n  text-shadow: 0 0 1px #fff;\n  background-image: linear-gradient(180deg, #fff 5%, #f4f4f4 95%);\n}\n.content {\n  margin: 6rem 0;\n}\n.content .illumination {\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg);\n  width: 40%;\n  height: 20rem;\n  z-index: -1;\n  top: -13rem;\n  left: 0;\n  right: 0;\n  margin: 0 auto;\n}\n.content .row {\n  margin: 4rem auto 0;\n}\n.content .description {\n  max-width: 960px;\n  text-shadow: 1px 1px 0 #fff;\n}\n.content .description h3 {\n  font-family: \"Colaborate Thin\", monospace;\n}\n.content .description p {\n  font-family: \"Droid Sans\", sans-serif;\n  color: #838383;\n}\n.content .description article {\n  position: relative;\n  padding-left: 80px;\n}\n.content .description article::before {\n  position: absolute;\n  left: 30px;\n  top: 21px;\n  content: \"\";\n  width: 40px;\n  height: 39px;\n}\n.content .description article a {\n  color: #1f262d;\n}\n.content .description article a:hover {\n  color: #11161c;\n  font-weight: bold;\n}\n.content .description .offer::before {\n  background: url(\"/Content/images/content-icons.png\") 0 76px;\n}\n.content .description .we-are::before {\n  background: url(\"/Content/images/content-icons.png\") 0 116px;\n}\n.content .description .mission span {\n  text-shadow: none;\n}\n.content .description .mission::before {\n  background: url(\"/Content/images/content-icons.png\") 0 0;\n}\n.content .about {\n  font-family: \"Colaborate Thin\", monospace;\n  position: relative;\n  color: #5c5c5c;\n  text-align: center;\n  border: 1px solid #d8d8d8;\n  border-left: 0;\n  border-right: 0;\n  background-color: #fff;\n  margin-bottom: 4rem;\n  background-image: linear-gradient(180deg, #fff 5%, #f4f4f4 95%);\n  box-shadow: 0 -1px 1rem rgba(204, 204, 204, 0.62);\n  box-shadow: 0 -1px 1rem rgba(204, 204, 204, 0.62), 0 1px 1rem rgba(204, 204, 204, 0.62);\n}\n.content .about p {\n  max-width: 960px;\n  margin: 4rem auto;\n  font-size: 1.5em;\n  line-height: 1.25;\n}\n.content .about.quote::before {\n  position: absolute;\n  top: -15px;\n  left: 0;\n  right: 0;\n  width: 36px;\n  height: 36px;\n  margin: auto;\n  content: \"\";\n  background: url(\"/Content/images/content-icons.png\") -3px 196px;\n}\n.content .about .read-more-trigger {\n  float: none;\n  position: absolute;\n  bottom: -17px;\n  width: 100px;\n  padding: .25em;\n  left: 0;\n  right: 0;\n  margin: 0 auto;\n}\n.content .about .read-more-state ~ .read-more-trigger:before {\n  content: \"Additional Info\";\n}\n.content .about .read-more-state:checked ~ .read-more-trigger:before {\n  content: 'Less Info';\n}\n.about {\n  position: relative;\n  color: white;\n}\n.about h2,\n.about h3 {\n  font-family: \"Colaborate Thin\", monospace;\n  margin-bottom: 2rem;\n  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.62);\n}\n.about .language,\n.about .btn-next {\n  position: absolute;\n  z-index: 10;\n  right: 5px;\n}\n.about .language {\n  top: 5px;\n}\n.about .btn-next {\n  bottom: 5px;\n  font-size: 1.5em;\n  padding: 0 5px;\n}\n.about .about-carousel .slick-slide:focus {\n  outline: none;\n}\n.about .about-carousel .slick-slide p {\n  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.62);\n}\n.about .about-carousel .slick-slide .outro {\n  margin-right: 5%;\n}\n.about .about-carousel .slick-dots button {\n  color: white;\n}\n.categories-gallery {\n  padding: 0 7%;\n  width: inherit;\n  list-style: none;\n}\n.categories-gallery .pic-1 {\n  z-index: 1;\n  -webkit-transform: rotate(-10deg);\n          transform: rotate(-10deg);\n}\n.categories-gallery .pic-2 {\n  z-index: 2;\n  -webkit-transform: rotate(4deg);\n          transform: rotate(4deg);\n}\n.categories-gallery .pic-3 {\n  z-index: 3;\n  -webkit-transform: rotate(-3deg);\n          transform: rotate(-3deg);\n}\n.categories-gallery .pic-4 {\n  z-index: 4;\n  -webkit-transform: rotate(7deg);\n          transform: rotate(7deg);\n}\n.categories-gallery .pic-0 {\n  z-index: 5;\n  -webkit-transform: rotate(2deg);\n          transform: rotate(2deg);\n}\n.categories-gallery li {\n  position: relative;\n  float: left;\n  height: 320px;\n  margin: 1rem 0rem -0.5rem 1rem;\n  padding: 1rem 1rem 2.5rem 1rem;\n  border: 1px solid #fff;\n  background-color: #fff;\n  box-shadow: 0px 2px 15px #333;\n}\n.categories-gallery li h3 {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  text-align: center;\n  color: #555;\n}\n.categories-gallery li .pic {\n  width: 240px;\n  height: 240px;\n}\n.categories-gallery li .pic:before {\n  content: \"\";\n  position: absolute;\n  top: 3.3%;\n  left: 4%;\n  width: 92.5%;\n  height: 75.3%;\n  box-shadow: inset 3px 3px 5px rgba(0, 0, 0, 0.43);\n}\n.categories-gallery li .pic img {\n  display: block;\n  width: 100%;\n  height: 100%;\n}"

/***/ }),

/***/ "./src/app/template/app.component.html":
/*!*********************************************!*\
  !*** ./src/app/template/app.component.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/user/auth.service.ts":
/*!**************************************!*\
  !*** ./src/app/user/auth.service.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var Rx_1 = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
var http_1 = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.tokenKey = 'accessToken';
        this.headers = { Authorization: '' };
    }
    AuthService.prototype.isAuthenticated = function () {
        //console.log("checking currentUser...");
        //console.log(this.currentUser);
        return !!this.currentUser;
    };
    AuthService.prototype.createAuthorizationHeader = function () {
        this.token = sessionStorage.getItem(this.tokenKey);
        console.log('token=' + this.token);
        if (this.token) {
            this.headers.Authorization = 'Bearer ' + this.token;
        }
    };
    AuthService.prototype.login = function (userName, password) {
        var _this = this;
        var authObj = {
            grant_type: 'password', username: userName, password: password
        };
        var headers = new http_1.HttpHeaders(); //{ 'Content-Type': 'application/x-www-form-urlencoded' });
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('grant_type', authObj.grant_type);
        urlSearchParams.append('username', authObj.username);
        urlSearchParams.append('password', authObj.password);
        var body = urlSearchParams.toString();
        //let options = new RequestOptions({ headers: HttpHeaders });
        var httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');
        };
        //let tokenKey = 'accessToken'
        return this.http.post('api/Token', body, httpOptions)
            .pipe(operators_1.map(function (response) {
            console.log(response);
            var token = response.json() && response.json().access_token;
            console.log(response.json().user);
            if (token) {
                //set the token property 
                _this.token = token;
                //user username and jwt token in local storage to keep user loggen in between page refreshes
                //localStorage.setItem('currentUser', JSON.stringify({ username: userName, token: token }));
                //this.currentUser = { userName: userName, id:'123', firstName:'Fan', lastName: 'Ren'  };
                // Cache the access token in session storage.
                sessionStorage.setItem(_this.tokenKey, token);
                //console.log(this.currentUser);
                //return true to indicate the successful login
                return true;
            }
            else {
                //return false to indicate failed login
                return false;
            }
        }));
    };
    //login(userName: string, password: string) {
    //    var tokenKey = 'accessToken'
    //    var loginData = {
    //        grant_type: 'password',
    //        username: userName,
    //        password: password,
    //    };
    //    $.ajax({
    //        type: 'POST',
    //        url: 'api/Token',
    //        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    //        data: loginData
    //    }).done(function (data) {
    //        console.log(data);
    //        //user(data.userName);
    //        // Cache the access token in session storage.
    //        sessionStorage.setItem(tokenKey, data.access_token);
    //        console.log("returning true...");
    //        return true;
    //        }).fail(this.showError);
    //    return true;
    //}
    AuthService.prototype.showError = function (jqXHR) {
        alert(jqXHR.status + ': ' + jqXHR.statusText);
        return false;
        //var response = jqXHR.responseJSON;
        //if (response) {
        //    if (response.Message) self.errors.push(response.Message);
        //    if (response.ModelState) {
        //        var modelState = response.ModelState;
        //        for (var prop in modelState) {
        //            if (modelState.hasOwnProperty(prop)) {
        //                var msgArr = modelState[prop]; // expect array here
        //                if (msgArr.length) {
        //                    for (var i = 0; i < msgArr.length; ++i) self.errors.push(msgArr[i]);
        //                }
        //            }
        //        }
        //    }
        //    if (response.error) self.errors.push(response.error);
        //    if (response.error_description) self.errors.push(response.error_description);
        //}
    };
    AuthService.prototype.loginUser = function (userName, password) {
        var _this = this;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({headers: headers});
        var httpOptions = {
            headers: headers
        };
        var loginInfo = { username: userName, password: password };
        return this.http.post('/api/login', JSON.stringify(loginInfo), httpOptions)
            .pipe(operators_1.tap(function (resp) {
            if (resp) {
                _this.currentUser = resp;
            }
        }), operators_1.catchError(function (error) {
            return Rx_1.Observable.of(false);
        }));
    };
    AuthService.prototype.checkAuthenticationStatus = function () {
        ////var tokenKey = 'accessToken'
        ////var token = sessionStorage.getItem(tokenKey);
        ////var headers = {'Authorization': ''};
        ////if (token) {
        ////    headers.Authorization = 'Bearer ' + token;
        ////}
        ////console.log(headers);
        ////var self = this;
        ////$.ajax({
        ////    type: 'GET',
        ////    url: '/api/values/get',
        ////    headers: headers
        ////}).done(function (data) {
        ////    console.log(data);
        ////    console.log("id=" + data.id);
        ////    self.currentUser = { id: data.id, firstName: data.firstName, lastName: data.lastName, userName: data.userName };
        ////    console.log(this.currentUser);
        ////}).fail(this.showError);
        var _this = this;
        this.createAuthorizationHeader();
        var headers = this.headers;
        return this.http.get('/api/values/get', {
            headers: headers
        }).map(function (response) {
            if (response._body) {
                return response.json();
            }
            else {
                return {};
            }
        })
            .do(function (currentUser) {
            //the user data
            console.log(currentUser);
            if (!!currentUser.userName) {
                _this.currentUser = currentUser;
            }
        })
            .subscribe();
    };
    AuthService.prototype.updateCurrentUser = function (firstName, lastName) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({headers: headers});
        var httpOptions = {
            headers: headers
        };
        return this.http.put("/api/users/" + this.currentUser.id, JSON.stringify(this.currentUser), httpOptions);
    };
    AuthService.prototype.logout = function () {
        this.currentUser = undefined;
        this.token = sessionStorage.getItem(this.tokenKey);
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token
        });
        console.log(headers);
        //let httpOptions = new RequestOptions({headers: headers});
        var httpOptions = {
            headers: headers
        };
        return this.http.post('/api/account/logout', JSON.stringify({}), httpOptions);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/app/user/css/login.component.css":
/*!**********************************************!*\
  !*** ./src/app/user/css/login.component.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\nem {\r\n    float:right; \r\n    color:#E05C65; \r\n    padding-left:10px;\r\n}\r\n\r\n.btn-default {\r\n  color: #333 ;\n  background-color: #fff;\n  border-color: #ccc;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/user/login.component.ts":
/*!*****************************************!*\
  !*** ./src/app/user/login.component.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/app/user/auth.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.loginInvalid = false;
    }
    LoginComponent.prototype.login = function (formValues) {
        var _this = this;
        console.log(formValues);
        //var resp = this.authService.login(formValues.userName, formValues.password);
        //console.log("resp=" + resp);
        //if (!resp) {
        //    this.loginInvalid = true;
        //} else {
        //    this.router.navigate(['quizs'])
        //}
        this.authService.login(formValues.userName, formValues.password).subscribe(function (resp) {
            if (!resp) {
                _this.loginInvalid = true;
            }
            else {
                _this.router.navigate(['quizs']);
            }
        });
    };
    LoginComponent.prototype.cancel = function () {
        this.router.navigate(['quizs']);
    };
    LoginComponent = __decorate([
        core_1.Component({
            template: __webpack_require__(/*! ./template/login.component.html */ "./src/app/user/template/login.component.html"),
            styles: [__webpack_require__(/*! ./css/login.component.css */ "./src/app/user/css/login.component.css")]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "./src/app/user/template/login.component.html":
/*!****************************************************!*\
  !*** ./src/app/user/template/login.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Login</h1>\r\n<hr>\r\n<div class=\"col-md-4\">\r\n  <form autocomplete=\"off\" #loginForm=\"ngForm\" (ngSubmit)=\"login(loginForm.value)\" novalidate>\r\n    <div class=\"form-group\" >\r\n      <label for=\"userName\">User Name:</label>\r\n      <em *ngIf=\"loginForm.controls.userName?.invalid && (loginForm.controls.userName?.touched || mouseoverLogin)\">Required</em>\r\n      <input id=\"userName\" type=\"text\" (ngModel)=\"userName\" name=\"userName\" required class=\"form-control\" placeholder=\"User Name...\" />\r\n    </div>\r\n    <div class=\"form-group\" >\r\n      <label for=\"password\">Password:</label>\r\n      <em *ngIf=\"loginForm.controls.password?.invalid && (loginForm.controls.password?.touched || mouseoverLogin)\">Required</em>\r\n      <input id=\"password\" type=\"password\" (ngModel)=\"password\" name=\"password\" required class=\"form-control\"placeholder=\"Password...\" />\r\n    </div>\r\n    <span (mouseenter)=\"mouseoverLogin=true\" (mouseleave)=\"mouseoverLogin=false\"><button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"loginForm.invalid\" >Login</button></span>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancel()\">Cancel</button>\r\n  </form>\r\n  <br>\r\n  <div *ngIf=\"loginInvalid\" class=\"alert alert-danger\">Invalid Login Info</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/assets/category-quiz.json":
/*!***************************************!*\
  !*** ./src/assets/category-quiz.json ***!
  \***************************************/
/*! exports provided: 0, 1, 2, default */
/***/ (function(module) {

module.exports = [{"id":4,"name":"History","avatarUrl":null},{"id":16,"name":"Military","avatarUrl":null},{"id":17,"name":"Science","avatarUrl":null}];

/***/ }),

/***/ "./src/assets/question-quiz-3.json":
/*!*****************************************!*\
  !*** ./src/assets/question-quiz-3.json ***!
  \*****************************************/
/*! exports provided: 0, 1, 2, 3, 4, default */
/***/ (function(module) {

module.exports = [{"id":1,"title":"hello","resultDescription":null,"answers":[{"id":23,"text":"11","isCorrect":true},{"id":24,"text":"22","isCorrect":false}]},{"id":2,"title":"world","resultDescription":null,"answers":[{"id":25,"text":"33","isCorrect":false},{"id":26,"text":"44","isCorrect":true}]},{"id":3,"title":"fan ren","resultDescription":null,"answers":[{"id":27,"text":"55","isCorrect":false},{"id":28,"text":"66","isCorrect":true}]},{"id":5,"title":"Shuping","resultDescription":null,"answers":[{"id":29,"text":"77","isCorrect":false},{"id":30,"text":"88","isCorrect":true}]},{"id":6,"title":"5th question","resultDescription":null,"answers":[{"id":31,"text":"ee","isCorrect":true},{"id":32,"text":"ff","isCorrect":false}]}];

/***/ }),

/***/ "./src/assets/question-quiz-5.json":
/*!*****************************************!*\
  !*** ./src/assets/question-quiz-5.json ***!
  \*****************************************/
/*! exports provided: 0, 1, 2, default */
/***/ (function(module) {

module.exports = [{"id":15,"title":"hello","resultDescription":null,"answers":[{"id":33,"text":"aa","isCorrect":true},{"id":34,"text":"bb","isCorrect":false}]},{"id":16,"title":"howdy","resultDescription":null,"answers":[{"id":35,"text":"cc","isCorrect":true},{"id":36,"text":"dd","isCorrect":false}]},{"id":17,"title":"Alright","resultDescription":null,"answers":[{"id":37,"text":"ee","isCorrect":false},{"id":38,"text":"ff","isCorrect":true}]}];

/***/ }),

/***/ "./src/assets/quiz-evaluations.json":
/*!******************************************!*\
  !*** ./src/assets/quiz-evaluations.json ***!
  \******************************************/
/*! exports provided: 0, 1, default */
/***/ (function(module) {

module.exports = [{"forQuizId":3,"title":"test 3","correctlyAnswered":[{"question":"hello","selectedAnswer":"11","correctAnswer":"11","resultDescription":null,"isCorrect":true},{"question":"world","selectedAnswer":"44","correctAnswer":"44","resultDescription":null,"isCorrect":true},{"question":"Shuping","selectedAnswer":"88","correctAnswer":"88","resultDescription":null,"isCorrect":true},{"question":"5th question","selectedAnswer":"ee","correctAnswer":"ee","resultDescription":null,"isCorrect":true}],"incorrectlyAnswered":[{"question":"fan ren","selectedAnswer":"55","correctAnswer":"66","resultDescription":null,"isCorrect":false}],"totalQuestions":5},{"forQuizId":5,"title":"Quiz 6","correctlyAnswered":[{"question":"hello","selectedAnswer":"aa","correctAnswer":"aa","resultDescription":null,"isCorrect":true},{"question":"howdy","selectedAnswer":"cc","correctAnswer":"cc","resultDescription":null,"isCorrect":true}],"incorrectlyAnswered":[{"question":"Alright","selectedAnswer":"ee","correctAnswer":"ff","resultDescription":null,"isCorrect":false}],"totalQuestions":3}];

/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
var environment_1 = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\VSCode\YTQuiz\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map