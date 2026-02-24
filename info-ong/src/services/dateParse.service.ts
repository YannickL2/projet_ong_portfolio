import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DateParseService {

    monthNames: string[] = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
    ]

    public dateToString(date_to_parse: Date):string {
        let date = new Date(date_to_parse)
        let day = date.getDate()
        let monthIndex = date.getMonth()
        let year = date.getFullYear()
        let monthName = this.monthNames[monthIndex]
        return `${day} ${monthName.toLowerCase()} ${year}`
    }
}