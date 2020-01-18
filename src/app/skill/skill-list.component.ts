import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import template from '/scripts/template/app.component.html';

import { Skill } from './skill';
import { SkillService } from './skill.service';

@Component({
    moduleId: module.id,
    //selector: 'skill-list',
    templateUrl: 'template/skill-list.component.html',
    styles: ['.skills {list-style-type: none;}', '*.skills li {padding: 4px;cursor: pointer;}']
})
export class SkillListComponent implements OnInit {
    skills: Observable<Skill[]>;
    
    constructor(private skillService: SkillService) {}
    
    ngOnInit() {
        this.skills = this.skillService.getSkills();
    }

}
