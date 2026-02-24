import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";


@Injectable({
    providedIn: 'root'
})


export class ModalService {
    private modalTitle: string = ''
    private active: boolean = false
    
    getModalTitle(): string {
        return this.modalTitle
    }

    setModalTitle(title: string): void {
        this.modalTitle = title
    }

    getActiveStatus(): boolean {
        return this.active
    }

    setActiveStatus(active: boolean) {
        this.active = active
    }

}