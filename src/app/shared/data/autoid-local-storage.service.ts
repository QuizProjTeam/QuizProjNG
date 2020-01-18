import { Component } from '@angular/core';
// import { Response , URLSearchParams, ResponseOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { CollectionHelper} from '../collectionhelper';

import {IRESTService, IParam} from './irest.service';
import {LocalStorageService} from './local-storage.service';
// import * as moment from 'moment';

export class AutoIDLocalStorageService<T> extends LocalStorageService<T> {

 // Name of property in type T to assign the Auto Incrementing ID number
    AutoIDProperty: string;


    /**
     * construnctor
     */
     constructor(key: string, AutoIDProperty: string, dataMapper: Function) {

        if ( AutoIDProperty == null || AutoIDProperty === '') {
            throw Error('AutoID Property not specified');
        }

        super(key, dataMapper);

        this.AutoIDProperty = AutoIDProperty;

    }



     add(itm: T): Observable<T> {

        // assign auto id
        itm[this.AutoIDProperty] = this.AssignAutoID();

        return super.add(itm);
     }


    private AssignAutoID(): number {
        // read current last used value
        let curr = Number(localStorage.getItem(this.storageKey + '-AutoID'));
        if (curr === 0) {
            curr = 100; // don't start at 1
        }
        curr += 1;
        // save for future
        localStorage.setItem(this.storageKey + '-AutoID', curr.toString());
        // return value
        return curr;
    }
}
