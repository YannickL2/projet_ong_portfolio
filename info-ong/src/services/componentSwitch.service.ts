import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ComponentName } from "../variables/componentName";

@Injectable({
    providedIn: 'root'
})

export class ComponentSwitchService {
    constructor(private componentName: ComponentName) {}
    private _actualComponent: Subject<string> =
        new BehaviorSubject<string>(this.componentName.enum.home)
    public actualComponent$ = this._actualComponent.asObservable()

    setActualComponent(componentName: string) {
        this._actualComponent.next(componentName)
    }
}