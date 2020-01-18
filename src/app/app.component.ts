import { Component, OnInit } from '@angular/core';
import { Router, Route, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './user/auth.service';
import { URLSearchParams, } from '@angular/http';
import { Response, Headers, RequestOptions } from '@angular/http';
//import { MessageService } from './messages/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './template/app.component.html'
})

@Injectable()
export class AppComponent implements OnInit  {
    pageTitle: string = 'Quiz Management';
    loading: boolean = true;

    constructor(private router: Router, private auth: AuthService, private activatedRoute: ActivatedRoute, private _http: HttpClient) {
        router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
            if (routerEvent instanceof NavigationStart
                /*|| routerEvent instanceof NavigationEnd
                || routerEvent instanceof NavigationCancel
                || routerEvent instanceof NavigationError*/) {

                let params = new URLSearchParams(routerEvent.url.split('?')[1]);
                //let id = params['id'];
                let id = params.get('id');
                let act = params.get('act');
                let userId = params.get('uid');
                console.log("id in qs in constructor " + id);
                console.log("act in qs in constructor " + act);
                console.log("uid in qs in constructor " + userId);
                // Cache the user id in session storage.
                localStorage.setItem("myUserId", JSON.stringify(userId));
                let userId2 = JSON.parse(localStorage.getItem('myUserId'));
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

    ngOnInit() {
        console.log("ngOnInit in app component");
        //this.auth.checkAuthenticationStatus();
        //document.dispatchEvent(.dispatchEvent(elementRef.nativeElement, new CustomEvent('angular-ready'));

        // subscribe to router event
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            console.log("id in qs " + id);
        });

        //if quizs is empty, load it from the local json file
            console.log("loading local quiz data...")
            let _localQuizsURL = '../assets/quizs.json';    
            this._http.get(_localQuizsURL).subscribe(data => {
                    console.log('data from local file:');
                    console.log(JSON.stringify(data));
                    localStorage.setItem('quizs', JSON.stringify(data));
                },
                (err: HttpErrorResponse) => {
                  console.log(err.message);
                }
            );
    }

    ngAfterViewInit() {
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
    }

    checkRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            this.loading = true;
        }

        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
            this.loading = false;
        }
    }

    displayMessages(): void {
        this.router.navigate([{ outlets: { popup: ['messages'] } }]);
        //this.messageService.isDisplayed = true;
    }

    hideMessages(): void {
        this.router.navigate([{ outlets: { popup: null } }]);
        //this.messageService.isDisplayed = false;
    }

    
}
