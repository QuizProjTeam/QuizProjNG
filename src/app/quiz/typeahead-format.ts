import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { CONFIG } from '../config';
import { Category } from './category';
import { CategoryService } from './category.service';

//const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
//    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
//    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
//    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
//    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
//    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
//    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
//    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];



@Component({
    selector: 'ngbd-typeahead-format',
    templateUrl: 'src/typeahead-format.html',
    styles: [`.form-control { width: 300px; }`]
})
export class NgbdTypeaheadFormat implements OnInit {
    public model: any;
    private categories: Category[];

    constructor(private categoryService: CategoryService) { }

    formatter = (result: string) => result.toUpperCase();

    search = (text$: Observable<string>) =>
        map.call(distinctUntilChanged.call(debounceTime.call(text$, 200)),
            term => term === '' ? [] : this.categories.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }
}
