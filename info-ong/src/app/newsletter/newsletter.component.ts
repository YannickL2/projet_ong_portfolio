import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpNewsletterService } from '../../services/httpNewsletter.service';
import { HttpClientModule } from '@angular/common/http';
import { NewsletterModel } from '../../models/newsletter.model';
import { Observable } from 'rxjs';
import { DateParseService } from '../../services/dateParse.service';
import { ModalComponent } from '../modal/modal.component';
import { ComponentToModalDataPassingService } from '../../services/ComponentToModalDataPassing.service';
import { ModalActivationService } from '../../services/modalActivate.service';
import { ComponentSwitchService } from '../../services/componentSwitch.service';
import { ComponentName } from '../../variables/componentName';
import { ModelName } from '../../variables/modelName';
import { PreviewTextService } from '../../services/previewTextContent.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';


@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ModalComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})

export class NewsletterComponent {

  @Output() isModalActive = new EventEmitter<boolean>()
  @Output() setActiveComponent = new EventEmitter<string>()
  preview_content: string | undefined
  creation_date: string | undefined
  latestArticle: NewsletterModel | undefined

  constructor(
    private httpService: HttpNewsletterService,
    private dateService: DateParseService,
    private componentToModalDataPassingService: ComponentToModalDataPassingService,
    private componentSwitchingService: ComponentSwitchService,
    private componentName: ComponentName,
    private modelName: ModelName,
    private previewTextService: PreviewTextService,
    public spinnerService: SpinnerService
  ) {
    this.spinnerService.setActivate(true)
    this.fetchLastNewsletter();
  }
  
  fetchLastNewsletter(): Promise<void> {
    return new Promise ((resolve, reject) => {
      const response = this.httpService.fetchLastNewsletter();
      response.subscribe(async data => {
        this.latestArticle = {
          title: data.title,
          content: data.content,
          isVisible: data.isVisible,
          creation_date: data.creation_date,
          modified_date: data.modified_date,
          visibleUntil: data.visibleUntil,
          image: data.image
        };
        this.creation_date = this.dateService.dateToString(this.latestArticle!.creation_date);
        this.preview_content = this.previewTextService.getFirstSpaceAfterHundredChar(this.latestArticle?.content)
        resolve()
        this.spinnerService.setActivate(false)
      }), () =>
       {
        reject()
       }
    })
  }

  getArticle() {
    return this.latestArticle
  }

  sendingData() {
    this.componentToModalDataPassingService.setDataToModal(
      this.modelName.enum.newsletter,
      this.latestArticle!
      )
  }

 sendActiveState() {
  this.sendingData()
    this.isModalActive.emit(true)
  }
 
  sendComponentToActivate() {
    this.componentSwitchingService.setActualComponent(this.componentName.enum.newsletter)
  }

}
