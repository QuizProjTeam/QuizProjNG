import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
    selector: 'input'
})
export class FocusedInputDirective {
    constructor(public renderer: Renderer, public elementRef: ElementRef) { }

    ngOnInit() {
        this.renderer.invokeElementMethod(
            this.elementRef.nativeElement, 'focus', []);
    }
}