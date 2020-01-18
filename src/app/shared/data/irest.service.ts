import { Observable } from 'rxjs';

export abstract class IRESTService<T> {
    constructor() { }

    abstract all(): Observable<T[]>;
    abstract get(routeid: IParam): Observable<T> ;
    abstract add(itm: T): Observable<T> ;
    abstract update(routeid: IParam, itm: T): Observable<T>;
    abstract delete(routeid: IParam): Observable<T>; // Observable<Response>;

    abstract find(params: IParam[]): Observable<T[]>;
    abstract findFirst(params: IParam[]): Observable<T>;
}

export interface IParam {
    param: string;
    val: any;
}
