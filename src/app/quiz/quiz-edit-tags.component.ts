import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { IQuiz } from './quiz';
import { CONFIG } from '../config';
import { Category } from './category';
import { CategoryService } from './category.service';


@Component({
    templateUrl: './template/quiz-edit-tags.component.html',
     styleUrls: ['./css/quiz-edit-tags.component.css', './css/bookblock.css', '../styles/less/index.css'],
})
export class QuizEditTagsComponent implements OnInit {
    errorMessage: string;
    newTags = '';
    quiz: IQuiz;
    private categories: Category[];
    category: Category;
    constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.quiz = data['quiz'];
        });

        this.getCategories();
    }

    selectedItem(evt) {
        this.category = evt.item;
        this.quiz.category = this.category;
        //this.quiz.category.id = this.selCategory.id;
        console.log("category.id: " + this.quiz.category.id);
        console.log("category.name: " + this.quiz.category.name);
    }

    // Add the defined tags
    addTags(): void {
        let tagArray = this.newTags.split(',');
        this.quiz.tags = this.quiz.tags ? this.quiz.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    }

    // Remove the tag from the array of tags.
    removeTag(idx: number): void {
        this.quiz.tags.splice(idx, 1);
        this.getCategories();
    }
    
    formatter = (result: any) => result.name.toUpperCase() || '';

    inputformatter = (result: any) => result.name || '';

    search = (text$: Observable<string>) =>
        map.call(distinctUntilChanged.call(debounceTime.call(text$, 200)),
            term => term === '' ? [] : this.categories.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

   

    getCategories() {
        this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }
}
