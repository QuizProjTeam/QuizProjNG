
import { Component, OnInit } from '@angular/core';
import { Coder } from './coder';
import { CoderService } from './coder.service';

@Component({
    moduleId: module.id,
    //selector: 'coder-list',
    templateUrl: './template/coder-list.component.html',
    styles: ['.coders {list-style-type: none;}', '*.coders li {padding: 4px;cursor: pointer;}']
})
export class CoderListComponent implements OnInit {
    coders: Coder[];

    constructor(private coderService: CoderService) { }

    ngOnInit() {
        this.coders = [];
        this.coderService.getCoders()
            .subscribe(coders => this.coders = coders);
    }
}