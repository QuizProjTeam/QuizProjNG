///api/quizzes/GetQuizCategories

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Category } from './category';

import { CONFIG } from '../config';

import { HttpClient } from '@angular/common/http';
import {map, tap, catchError} from 'rxjs/operators';

let categoriesUrl = CONFIG.baseUrls.categories

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) { }

    getCategories() {
        console.log("getCategories...");
        return this.http
            .get(categoriesUrl )
            .pipe(
                map((res) => <Category[]>res)
            )
    }

    //getCategory(qzid: number, id: number) {
    //    return this.getCategories(qzid)
    //        .map(Categories => Categories.find(Category => Category.id === id));
    //}
}