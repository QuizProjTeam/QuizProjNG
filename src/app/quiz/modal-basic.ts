import { Component } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-basic',
    templateUrl: 'template/modal-basic.html',
    styles: [`
        
    `]
})

    //.fade.in {opacity: 1;},
        //.modal.in .modal-dialog {-webkit-transform: translate(0, 0);-o-transform: translate(0, 0);transform: translate(0, 0);},
        //.modal-backdrop .fade .in  {opacity: 0.5!important;},
        //.modal-backdrop.fade {opacity: 0.5 !important;},
export class NgbdModalBasic {
    closeResult: string;

    constructor(private modalService: NgbModal) { }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}