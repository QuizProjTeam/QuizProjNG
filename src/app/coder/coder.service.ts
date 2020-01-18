import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Coder } from './Coder';

import { CONFIG } from '../config';

let codersUrl = CONFIG.baseUrls.coders;

@Injectable()
export class CoderService {
    constructor(private http: Http) { }

    getCoders() {
        return this.http
            .get(codersUrl)
            .map((response: Response) => <Coder[]>response.json().data);
    }

    getCoder(id: number) {
        return this.getCoders()
            .map(coders => coders.find(coder => coder.id === id));
    }
}