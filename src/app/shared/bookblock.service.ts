import { InjectionToken  } from '@angular/core'

export let BOOKBLOCK_TOKEN = new InjectionToken('bookBlock');

export interface BookBlock {
    flip(toPageNumber: number): void;
    //info(msg: string, title?: string): void;
    //warning(msg: string, title?: string): void;
    //error(msg: string, title?: string): void;
}