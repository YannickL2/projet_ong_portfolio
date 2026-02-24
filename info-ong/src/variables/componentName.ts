import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ComponentName {
    enum = {
        'home': 'home',
        'newsletter': 'newsletter',
        'accomplishment': 'accomplishment'
    }
}