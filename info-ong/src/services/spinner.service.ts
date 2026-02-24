import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";


@Injectable({
    providedIn: 'root'
})


export class SpinnerService {
    private activate: boolean = false
    private waitingQueue: boolean[] = []


    isWaiting(): boolean {
        if (this.waitingQueue.length===0) {
            return false
        }
        return true
    }

    setActivate(activate: boolean):void {
        if (activate) {
            this.waitingQueue.push(activate)
        }
        else {
            this.waitingQueue.shift()
        }
    }

}
