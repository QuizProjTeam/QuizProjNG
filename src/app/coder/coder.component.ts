import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Coder } from './coder';
import { CoderService } from './coder.service';

@Component({
    moduleId: module.id,
    selector: 'coder',
    templateUrl: './template/coder.component.html'
})
export class CoderComponent implements OnInit {
    @Input() coder: Coder;

    private id: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private coderService: CoderService) { }

    ngOnInit() {
        if (!this.coder) {
            // Could use a snapshot here, as long as the parameters do not change.
            // This may happen when a component is re-used.
            // this.id = +this.route.snapshot.params['id'];
            this.route
                .params
                .map(params => params['id'])
                .do(id => this.id = +id)
                .subscribe(id => this.getCoder());
        }
    }

    private getCoder() {
        this.coderService.getCoder(this.id)
            .subscribe((coder: Coder) => this.setEditCoder(coder));
    }

    private gotoCoders() {
        let route = ['/coders'];
        this.router.navigate(route);
    }

    private setEditCoder(coder: Coder) {
        if (coder) {
            this.coder = coder;
        } else {
            this.gotoCoders();
        }
    }
}