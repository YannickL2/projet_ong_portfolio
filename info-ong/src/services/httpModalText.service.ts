import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment"
import { Injectable } from "@angular/core";
import { Observable, concat, of } from "rxjs";
import { ModalTextModel } from "../models/modal_text.model";


@Injectable({
    providedIn: 'root'
})


export class HttpModalTextService {
    constructor(private httpClient: HttpClient) {
    }

    modal_text_modal: ModalTextModel | undefined
    public modal_text: Observable<ModalTextModel> = of()
    public modal_text_list: Observable<ModalTextModel[]> = of([])

    fetchAllModalTexts(): Observable<ModalTextModel[]> {
        const endpoint = `${environment.apiUrl}modal-texts/`
        this.modal_text_list = this.httpClient.get<ModalTextModel[]>(endpoint)
        return this.modal_text_list
    }

    fetchModalContentByTitle(title: string): Observable<ModalTextModel> {
        const endpoint = `${environment.apiUrl}modal-text/search/${title}`
        this.modal_text = this.httpClient.get<ModalTextModel>(endpoint)
        return this.modal_text
    }
}