import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Skill } from './skill';

import { CONFIG } from '../config';

let skillsUrl = CONFIG.baseUrls.skills;

@Injectable()
export class SkillService {

    constructor(private http: Http) { }

    
    getSkill(id: number) {
        return this.getSkills()
            .map(skills => skills.find(skill => skill.id === id));
    }

    getSkills() {
        return this.http
            .get(skillsUrl)
            .map((response: Response) => <Skill[]>response.json().data);
    }

}