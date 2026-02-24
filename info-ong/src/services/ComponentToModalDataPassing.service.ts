import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { NewsletterModel } from "../models/newsletter.model";
import { AccomplishmentModel } from "../models/accomplishment.model";


@Injectable({
    providedIn: 'root'
})

export class ComponentToModalDataPassingService {
    constructor() {}
    private dataSource = new BehaviorSubject
    <{
        modalName: string,
        model: NewsletterModel | AccomplishmentModel | undefined
    }>
    ({modalName: '' , model: undefined})
    
    public dataSource$ = this.dataSource.asObservable()

    /** Set data to modal with
     * @param modalName: name of the target modal
     * @param Model: NewsletterModel | AccomplishmentModel | undefined
     */
    setDataToModal(modalName: string, model: NewsletterModel | AccomplishmentModel | undefined) {
        this.dataSource.next({modalName: modalName, model:model})
    }
}