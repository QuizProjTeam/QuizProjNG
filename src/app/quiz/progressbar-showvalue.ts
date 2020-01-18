import { Component, Input, Output, Pipe } from '@angular/core';
//import { AsyncPipe } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'ngbd-progressbar-showvalue',
    //pipes: [AsyncPipe],  //import this from angular2/core
    templateUrl: 'template/progressbar-showvalue.html',
    styles: [`
    ngb-progressbar {
      margin-top: 5rem;
    }
  `]
})
export class NgbdProgressbarShowvalue {
    @Input() completedToPass :number;
    @Input() totalToPass: number;
    Math: any;
    constructor() {
        this.Math = Math;
        //this.number = 2.5
    }

    //completePercent: Observable<number>;
    //@Output() completion: any = {
        
    //    percent: Math.round(this.completedToPass / this.totalToPass * 100)
    //}
    //@Output() completePercent() {
    //    //var completed:number = this.completedToPass;
    //    //var total:number = this.totalToPass;
    //    return Math.round(this.completedToPass / this.totalToPass * 100);
    //}
    //completion = {
    //    percent: Observable.interval(200).map(val => val % 100).do(val => console.log(val))
    //}
}
