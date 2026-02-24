import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})


export class PreviewTextService {    
    getFirstSpaceAfterHundredChar(inputText: string) {
        let index = inputText.indexOf(' ', 100);
        return inputText.slice(0,  index) + " ...";
    }
}