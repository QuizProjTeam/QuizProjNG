
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
//import { RouterOutlet } from '@angular/router';
import './rxjs-extensions';


import { AppComponent } from './app.component';

import { SkillService } from './skill/skill.service';
import { CoderService } from './coder/coder.service';
import { UserProfileService } from './login/user-profile.service';
import { CanActivateAuthGuard } from './can-activate.service';

import { AppRoutingModule, routableComponents } from './app-routing.module';


@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule, AppRoutingModule],
    declarations: [AppComponent, routableComponents],
    providers: [CanActivateAuthGuard, UserProfileService, SkillService, CoderService ],
    bootstrap: [AppComponent]

})
export class AppModule { }