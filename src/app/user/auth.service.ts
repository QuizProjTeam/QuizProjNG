import { Injectable } from '@angular/core';
import {IUser} from './user.model'
import { Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {HttpClient, HttpHeaders } from '@angular/common/http';
import {map, tap, catchError} from 'rxjs/operators';

//import $ from "jquery";

//var $ = require("jquery");

declare let $ : any;

@Injectable()
export class AuthService {
    public currentUser: IUser;
   tokenKey: string = 'accessToken';
   token: string;
   headers: any = { Authorization: '' };
  constructor(private http: HttpClient) { }

  isAuthenticated() {
      //console.log("checking currentUser...");
      //console.log(this.currentUser);
      return !!this.currentUser;
  }

  createAuthorizationHeader() {
      this.token = sessionStorage.getItem(this.tokenKey);
      console.log('token=' + this.token)
      if (this.token) {
          this.headers.Authorization = 'Bearer ' + this.token;
      }
  }

  
  login(userName: string, password: string): Observable<boolean> {
      var authObj = {
          grant_type: 'password', username: userName, password: password
      }

      let headers = new HttpHeaders ();      //{ 'Content-Type': 'application/x-www-form-urlencoded' });
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('grant_type', authObj.grant_type);
      urlSearchParams.append('username', authObj.username);
      urlSearchParams.append('password', authObj.password);
      let body = urlSearchParams.toString()

      //let options = new RequestOptions({ headers: HttpHeaders });
      const httpOptions = {
        headers: new HttpHeaders ({ 'Content-Type': 'application/x-www-form-urlencoded' })
        //headers.append('Content-Type', 'application/x-www-form-urlencoded');
      };

      //let tokenKey = 'accessToken'
      return this.http.post('api/Token', body, httpOptions)
          .pipe(
            map((response: Response) => {
              console.log(response);
              let token = response.json() && response.json().access_token;
              console.log(response.json().user);
              if (token) {
                  //set the token property 
                  this.token = token;
                  //user username and jwt token in local storage to keep user loggen in between page refreshes
                  //localStorage.setItem('currentUser', JSON.stringify({ username: userName, token: token }));
                  //this.currentUser = { userName: userName, id:'123', firstName:'Fan', lastName: 'Ren'  };
                  // Cache the access token in session storage.
                    sessionStorage.setItem(this.tokenKey, token);
                    //console.log(this.currentUser);
                  //return true to indicate the successful login
                  return true;
              } else {
                  //return false to indicate failed login
                  return false;
              }
          })
        );
  }

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

showError(jqXHR) {

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
}

  loginUser(userName: string, password: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    //let options = new RequestOptions({headers: headers});
    let httpOptions = {
      headers: headers
    };
    let loginInfo = { username: userName, password: password };

    return this.http.post('/api/login', JSON.stringify(loginInfo), httpOptions)
    .pipe(
        tap(resp => {
          if(resp) {
            this.currentUser = <IUser>resp;
          }
        }),
        catchError(error => {
          return Observable.of(false);
        })
    )
  }
  
  

  checkAuthenticationStatus() {
      

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


      this.createAuthorizationHeader();
      var headers = this.headers;
      return this.http.get('/api/values/get', {
          headers
      }).map((response: any) => {
          if(response._body) {
            return response.json();
          } else {
            return {}
          }
        })
          .do(currentUser => {
                  //the user data
                  console.log(currentUser);
          if(!!currentUser.userName) {
            this.currentUser = currentUser;
          }
        })
        .subscribe();
  }

  updateCurrentUser(firstName:string, lastName:string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    //let options = new RequestOptions({headers: headers});
    let httpOptions = {
      headers: headers
    };
    return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), httpOptions);
  }

  logout() {
      this.currentUser = undefined;
      this.token = sessionStorage.getItem(this.tokenKey);
    
    let headers = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token});
    
    console.log(headers)
    
    //let httpOptions = new RequestOptions({headers: headers});
    let httpOptions = {
      headers: headers
    };

    return this.http.post('/api/account/logout', JSON.stringify({}), httpOptions);
  }
}
