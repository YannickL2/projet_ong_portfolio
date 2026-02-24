import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment"
import { Injectable } from "@angular/core";
import { Observable, concat, of } from "rxjs";
import { AccomplishmentModel } from "../models/accomplishment.model";
import { end } from "@popperjs/core";



@Injectable({
    providedIn: 'root'
})


export class HttpAccomplishmentService {
    constructor(private httpClient: HttpClient) {}
        
        accomplishmentModel: AccomplishmentModel | undefined
        public accomplishment: Observable<AccomplishmentModel> = of()
        public accomplishment_list: Observable<AccomplishmentModel[]> = of([])

        fetchAllAccomplishments(): Observable<AccomplishmentModel[]> {
            const endpoint = `${environment.apiUrl}accomplishments/`
            this.accomplishment_list = this.httpClient.get<AccomplishmentModel[]>(endpoint)
            return this.accomplishment_list
        }

        fetchLastAccomplishment() {
            const endpoint =  `${environment.apiUrl}accomplishment/`
            this.accomplishment = this.httpClient.get<AccomplishmentModel>(endpoint)
            return this.accomplishment
        }

        fetchAccomplishmentByTitle(title: string) {
            const endpoint = `${environment.apiUrl}accomplishment/search/${title}/`
            return this.httpClient.get(endpoint)
        }
    }
