// import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ServiceHelper} from './service-helper';
import {IRESTService, IParam} from './irest.service';


// @Injectable()
export class RestBaseService<T> extends IRESTService<T> {


    constructor(private _http: HttpClient, private _url: string, private _withCreds: boolean) {
        super();
       }



    all(): Observable<T[]> {

       const x =  this._http.get<T[]>(this._url)
        .pipe(
          catchError(ServiceHelper.HandleError)
        );

        return x;
    }

    // https://angular.io/tutorial/toh-pt6#import-heroes
    find(pm: IParam[]): Observable<T[]> {

        // const hdrs = new HttpHeaders();
        // hdrs.append("")

        let hp = new HttpParams();

        pm.forEach(element => {
            hp = hp.append(element.param, element.val.toString());
        });

        console.log('find', hp.toString());

        return this._http.get<T[]>(this._url, { params: hp} )
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .pipe(
            tap(obj => {
                console.log('found', obj);
            } ),
            catchError(ServiceHelper.HandleError)
            );

    }

    findFirst(pm: IParam[]): Observable<T> {

        let hp = new HttpParams();

        // immutable, so hp must be reset after every append
        pm.forEach(element => {
            hp = hp.append(element.param, element.val.toString());
        });

        return this._http.get<T>(this._url, { params: hp})
            .pipe(
                tap(obj => {
                    console.log('findFirst.found', obj);
                },
                map ( obj => {
                    if (Array.isArray(obj)) {
                        if (obj.length > 0) {
                            return obj[0];
                        } else {
                            return null;
                        }
                    } else {
                        return obj;
                    }
                })
            ),
                catchError(ServiceHelper.HandleError)
            );
 }


// working
    get(routeid: IParam): Observable<T> {
             return this._http.get<T>(this._url + '/' + routeid.val, {withCredentials: this._withCreds} )
                   .pipe(
                    catchError(ServiceHelper.HandleError)
                  );
    }

// working
    add(itm: T): Observable<T> {

        const headers = new HttpHeaders();
             // const hdrs = new HttpHeaders();
            // hdrs.append("")
        headers.append('Content-Type', 'application/json');

        return this._http.post<T>(this._url, itm, {headers: headers}).pipe(
            tap((obj: T) => console.log('added item ')),
            catchError(ServiceHelper.HandleError)
          );
    }

// not working 204 No Content
    update(routeid: IParam, itm: T): Observable<T> {
        const headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');

            return this._http.put<T>(
            this._url + '/' + routeid.val  ,
            itm, {
                headers: headers
            }).pipe(
                tap(_ => console.log('Update')),
                catchError(ServiceHelper.HandleError)
              );
            // .map(ServiceHelper.GetStatusCode)
            // .do(data => console.log('update ' +  data))
            // .catch(ServiceHelper.HandleError);
      }


// Working
    delete(routeid: IParam): Observable<T> {
        const headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');

      console.log('Sending Delete request', routeid);

            return this._http.delete<T>(this._url + '/' + routeid.val, {headers: headers}).pipe(
                tap(_ => console.log('deleted')),
                catchError(ServiceHelper.HandleError)
              );
/*
            return this._http.delete(
            this._url + '/' + routeid.val,  {
                headers: headers,
                withCredentials: this._withCreds,
                body: '' // Errors out w/o a body specified???
            });
            */
      }


}
