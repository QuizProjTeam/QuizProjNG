
import { Component } from '@angular/core';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Component({
    templateUrl: './scripts/user/template/logout.component.html',
    styleUrls: ['./scripts/user/css/logout.component.css']
})

export class LogoutComponent {
    logoutSuccess = false;

    constructor(private authService: AuthService, private router: Router) {

    }

    logout() {
        
        console.log("logging out...");
        this.authService.logout().subscribe(resp => {
            if (!resp) {
                console.log("not successful!");
            } else {
                this.logoutSuccess = true;
                this.router.navigate(['quizs'])
            }
        })

    }


}