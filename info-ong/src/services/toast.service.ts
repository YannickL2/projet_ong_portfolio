import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class ToastService {
    private message = new Subject<string>()
    public getMessage$ = this.message.asObservable()
    private showToast = new Subject<boolean>()
    public getShowToast$ = this.showToast.asObservable()

    setMessage(message: string) {
        this.message.next(message)
    }

    setShowToast(isActive: boolean) {
        this.showToast.next(isActive)
    }
}