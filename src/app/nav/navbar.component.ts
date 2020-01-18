import { Component } from '@angular/core'
import { AuthService } from '../user/auth.service'
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html',
  styles: [`
    .nav.navbar-nav {font-size:15px} 
    #searchForm {margin-right:100px; } 
    @media (max-width: 1200px) {#searchForm {display:none}}
    li > a.active { color: #F97924; }
    [hidden] { display: none !important;}
  `],

})
export class NavBarComponent {
    constructor(private router: Router, private auth: AuthService) {
    }

  logout(): void {
      this.auth.logout();
      this.router.navigateByUrl('/user/logout');
  }
}
