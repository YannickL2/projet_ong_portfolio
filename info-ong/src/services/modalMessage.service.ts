import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IMessage } from "../interfaces/modalMessage.interface";

@Injectable({
    providedIn: 'root'
})


export class ModalMessageService {
    private message = new Subject<IMessage>()
    public getMessage$ = this.message.asObservable()
    
    setMessage(message: IMessage) {
        this.message.next({
            title: message.title,
            content: message.content,
            image: message.image
        })
    }
}