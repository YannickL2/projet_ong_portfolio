import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ModelName {
    enum = {
        'newsletter': 'newsletter',
        'accomplishment': 'accomplishment'
    }
}