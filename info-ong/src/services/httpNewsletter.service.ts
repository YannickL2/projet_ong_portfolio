import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment"
import { Injectable } from "@angular/core";
import { Observable, concat, of } from "rxjs";
import { NewsletterModel } from "../models/newsletter.model";


@Injectable({
    providedIn: 'root'
})


export class HttpNewsletterService {

    constructor(private httpClient: HttpClient) { }

    newsletterModel: NewsletterModel | undefined
    public newsletter: Observable<NewsletterModel> = of()
    public newsletter_list: Observable<NewsletterModel[]> = of([])

    fetchAllNewsletters(): Observable<NewsletterModel[]> {
        const endpoint = `${environment.apiUrl}articles/`
        this.newsletter_list = this.httpClient.get<NewsletterModel[]>(endpoint)
        return this.newsletter_list
    }

    fetchLastNewsletter(): Observable<NewsletterModel> {
        const endpoint = `${environment.apiUrl}article/`
        this.newsletter = this.httpClient.get<NewsletterModel>(endpoint)
        return this.newsletter
    }

    fetchNewsletterByTitle(title: string) {
        const endpoint = `${environment.apiUrl}article/search/${title}/`
        this.newsletter = this.httpClient.get<NewsletterModel>(endpoint)
        return this.newsletter
    }
}