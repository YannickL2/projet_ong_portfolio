import { CommonModule } from '@angular/common';
import { AfterRenderPhase, AfterViewChecked, AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { HttpNewsletterService } from '../../services/httpNewsletter.service';
import { NewsletterModel } from '../../models/newsletter.model';
import { DateParseService } from '../../services/dateParse.service';
import { ComponentName } from '../../variables/componentName';
import { ComponentSwitchService } from '../../services/componentSwitch.service';
import { Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-newsletter-page',
  standalone: true,
  imports: [
  CommonModule,
  RouterOutlet
  ],
  templateUrl: './newsletter-page.component.html',
  styleUrl: './newsletter-page.component.css'
})
export class NewsletterPageComponent {
  @Input() actualActiveComponent: string | undefined
  private actualComponentActive: string = ""
  private newsletters_list: NewsletterModel[] = []
  private newsDisplay: any[] = []

  constructor(
    private httpService: HttpNewsletterService,
    private dateService: DateParseService,
    private componentSwitchService: ComponentSwitchService,
    private componentName: ComponentName,
    private location: Location
    ) {
    this.componentSwitchService.actualComponent$
      .subscribe(componentName => {
          this.actualComponentActive = componentName;
    })
    this.fetchNewsletterList()
  }

  goBack() {
    this.location.back()
  }

  getNewsletterDisplayList(): NewsletterModel[] {
    return this.newsDisplay
  }

  isThisComponentActive(): boolean {
    return (this.actualComponentActive===this.componentName.enum.newsletter) ? true : false
  }

  fetchNewsletterList(): Promise<void> {
    return new Promise ((resolve, reject) => {
      const response = this.httpService.fetchAllNewsletters();
      response.subscribe(async data => {
        this.newsletters_list = data
        this.setNewsDisplay()
        resolve()
      }), () =>
       {
        reject()
       }
    })
  }
  
  setNewsDisplay() {
    this.newsletters_list.forEach(news => {
      this.newsDisplay.push(
        {
          title: news.title,
          content: news.content,
          isVisible: news.isVisible,
          creation_date: this.dateService.dateToString(news.creation_date),
          image: news.image
        }
      )
     })
  }

}

