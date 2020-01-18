import { Component } from '@angular/core';
import { Response , URLSearchParams, ResponseOptions} from '@angular/http';
import { Observable, of } from 'rxjs';
import { CollectionHelper} from '../collectionhelper';

import {IRESTService, IParam} from './irest.service';

export class LocalStorageService<T>  extends IRESTService<T>  {

    // Properties
    data: T[];
    storageKey: string;

    /**
     * construnctor
     */
     constructor(key: string, private dataMapper: Function) {

        super();

        this.storageKey = key;

        console.log('Local-storage-Service for ' + key);

        this.ReadLocal();

    }


    // Util methods
    public WriteLocal() {
        console.log('Local-storage-Service for ' + this.storageKey + ' Write local storage');

        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }
    public ReadLocal() {
        // losing class type, instances are not returned as T but of <any>.
        console.log('Local-storage-Service for ' + this.storageKey + ' Reading local storage');

        this.data = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        if (this.dataMapper) {
            console.log('Local-storage-Service for ' + this.storageKey + ' Calling dataMapper');

            this.data.forEach(dd => {
               this.dataMapper.call(this, dd);
            });
        }
    }



    // main methods
     all(): Observable<T[]> {
        console.log('Local-storage-Service for ' + this.storageKey + ' ALL()');

        return of(this.data);
     }

     find(params: IParam[]): Observable<T[]> {
        // console.log('Find', params);
        console.log('Local-storage-Service for ' + this.storageKey + ' Find() with', params);
        if (params.length > 0) {
            let found = this.data;

            params.forEach(element => {
                found = CollectionHelper.FindAllByProperty(found, element.param, element.val);
            });

            console.log('Local-storage-Service for ' + this.storageKey + ' Find() results', found);
            return of(found);

        } else {
            return of(this.data);
        }

     }


     findFirst(params: IParam[]): Observable<T> {
        // console.log('Find', params);
        console.log('Local-storage-Service for ' + this.storageKey + ' findFirst() with', params);
        if (params.length > 0) {
            let found = this.data;

            params.forEach(element => {
                found = CollectionHelper.FindAllByProperty(found, element.param, element.val);
            });

            console.log('Local-storage-Service for ' + this.storageKey + ' findFirst()', found);
            return of(found[0]);

        } else {
            return of(null);
        }

     }

     get(routeid: IParam): Observable<T> {
        console.log('Local-storage-Service for ' + this.storageKey + ' Get()', routeid);

        const itm = CollectionHelper.FindFirstByProperty(this.data, routeid.param, routeid.val);
        if (itm) {
            return of(itm);
        } else {
            return of(null);
        }

     }

     add(itm: T): Observable<T> {
        console.log('ADD - Local-storage-Service for ' + this.storageKey, itm);

        CollectionHelper.AddItem(itm, this.data);
        this.WriteLocal();
        return of(itm);
     }

     update(routeid: IParam, itm: T): Observable<T> {
        console.log('UPDATE - Local-storage-Service for ' + this.storageKey, itm);
        const rslt = CollectionHelper.ReplaceItem(itm, itm, this.data);

         if (rslt > 0) {
             this.WriteLocal();
             return of(itm);
         } else {
            return of(itm);
         }

     }

     delete(routeid: IParam): Observable<T> {
        console.log('DEL - Local-storage-Service for ' + this.storageKey, routeid);
        const itm = CollectionHelper.FindFirstByProperty(this.data, routeid.param, routeid.val);
        if (itm) {
            CollectionHelper.DeleteItem(itm, this.data);
            this.WriteLocal();
        }

        return of(itm);
     }
}
