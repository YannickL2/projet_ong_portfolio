import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class ModalActivationService {
    private modalSource = new Subject<boolean>()
    public getIsModalActive$ = this.modalSource.asObservable()

    setIsModalActive(isModalActive: boolean) {
        this.modalSource.next(isModalActive)
    }
}