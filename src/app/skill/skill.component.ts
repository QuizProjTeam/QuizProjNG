import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Skill } from './skill';
import { SkillService } from './skill.service';

@Component({
    moduleId: module.id,
    selector: 'skill',
    templateUrl: 'template/skill.component.html'
})

export class SkillComponent implements OnInit {
    @Input() skill: Skill;

    private id: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private skillService: SkillService) { }

    ngOnInit() {
        if (!this.skill) {
            // Could use a snapshot here, as long as the parameters do not change.
            // This may happen when a component is re-used.
            // this.id = +this.route.snapshot.params['id'];
            this.route
                .params
                .map(params => params['id'])
                .do(id => this.id = +id)
                .subscribe(id => this.getSkill());
        }
    }

    private getSkill() {
        this.skillService.getSkill(this.id)
            .subscribe((skill: Skill) => this.setEditSkill(skill));
    }

    private gotoSkills() {
        let route = ['/skills'];
        this.router.navigate(route);
    }

    private setEditSkill(skill: Skill) {
        if (skill) {
            this.skill = skill;
        } else {
            this.gotoSkills();
        }
    }
}

