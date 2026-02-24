import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentName } from '../../variables/componentName';
import { HttpAccomplishmentService } from '../../services/httpAccomplishments.service';
import { AccomplishmentModel } from '../../models/accomplishment.model';
import { DateParseService } from '../../services/dateParse.service';
import { ComponentSwitchService } from '../../services/componentSwitch.service';
import { exceptedURLScrollToTop } from '../../config/exceptedUrlToScrollTop';

@Component({
  selector: 'app-accomplishment-page-component',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './accomplishment-page-component.component.html',
  styleUrl: './accomplishment-page-component.component.css'
})

export class AccomplishmentPageComponentComponent{
  @Input() actualActiveComponent: string | undefined
  private accomplishments_list: AccomplishmentModel[] = []
  private accomplishmentsDisplay: any[] = []
  private actualComponentActive: string = ""

  constructor(
    private httpService: HttpAccomplishmentService,
    private dateService: DateParseService,
    private componentSwitchService: ComponentSwitchService,
    private componentName: ComponentName
  ) {
    this.componentSwitchService.actualComponent$
    .subscribe(componentName => {
        this.actualComponentActive = componentName;
  })
    this.fetchAccomplishmentList()
  }

  isThisComponentActive(): boolean {
    return (this.actualComponentActive===this.componentName.enum.accomplishment) ? true : false
  }

  fetchAccomplishmentList(): Promise<void> {
    return new Promise((resolve, reject) => {
      const response = this.httpService.fetchAllAccomplishments()
      response.subscribe(async data => {
        this.accomplishments_list = data
        this.setAccomplishmentsDisplay()
        resolve()
      }), () => {
        reject()
      }
    })
  }

  getAccomplishmentsDisplay() {
    return this.accomplishmentsDisplay
  }

  setAccomplishmentsDisplay() {
    this.accomplishments_list.forEach(accomplishment => {
      this.accomplishmentsDisplay.push({
        title: accomplishment.title,
        content: accomplishment.content,
        isVisible: accomplishment.isVisible,
        creation_date: this.dateService.dateToString(accomplishment.creation_date),
        image: accomplishment.image,
        location: accomplishment.location
      })
    })
  }
}