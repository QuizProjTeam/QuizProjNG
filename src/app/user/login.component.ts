import { Component } from '@angular/core';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Component({
    templateUrl: 'template/login.component.html',
    styleUrls: ['css/login.component.css']
})
export class LoginComponent {
  loginInvalid = false;

  constructor(private authService:AuthService, private router:Router) {

  }

  login(formValues) { 
    console.log(formValues);
    //var resp = this.authService.login(formValues.userName, formValues.password);
    //console.log("resp=" + resp);
    //if (!resp) {
    //    this.loginInvalid = true;
    //} else {
    //    this.router.navigate(['quizs'])
    //}

    this.authService.login(formValues.userName, formValues.password).subscribe(resp => {
      if(!resp) {
        this.loginInvalid = true;
      } else {
        this.router.navigate(['quizs'])
      }
    })
    
  } 

  cancel() {
    this.router.navigate(['quizs'])
  }

}