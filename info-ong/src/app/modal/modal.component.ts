import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { NewsletterModel } from '../../models/newsletter.model';
import { DateParseService } from '../../services/dateParse.service';
import { ComponentToModalDataPassingService } from '../../services/ComponentToModalDataPassing.service';
import { NewsletterComponent } from '../newsletter/newsletter.component';
import { HttpNewsletterService } from '../../services/httpNewsletter.service';
import { ModelName } from '../../variables/modelName';
import { CommonModule } from '@angular/common';
import { NewsletterPageComponent } from "../newsletter-page/newsletter-page.component";
import { ModalActivationService } from '../../services/modalActivate.service';


@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
    imports: [
        CommonModule,
        NewsletterComponent,
        NewsletterPageComponent
    ]
})
export class ModalComponent {

  @Input() newsletter: NewsletterModel | undefined
  @Output() isModalActive = new EventEmitter<boolean>()
  
  is_active: boolean = false;

  article: { 
    title: string,
    content: string,
    isVisible: boolean,
    creation_date: string,
    modified_date: Date,
    visibleUntil: Date,
    image: string,
    location: string | undefined
  } = {
    title: 'string',
    content: 'string',
    isVisible: false,
    creation_date: 'string',
    modified_date: new Date("2024-02-02"),
    visibleUntil: new Date("2024-02-02"),
    image: 'string',
    location: undefined
  }


  constructor(
    private dateService: DateParseService,
    private componentToModalDataPassingService: ComponentToModalDataPassingService,
    private httpService: HttpNewsletterService,
    private modelName: ModelName,
    private modalActivationService: ModalActivationService
    ) {
    }

  private requestedModalName: string = ''

  ngOnInit() {
    this.modalActive()
    this.setOverflowActive(true);
    this.componentToModalDataPassingService.dataSource$
    .subscribe(data => {
      this.requestedModalName = data.modalName
      switch(data.modalName) {
        case this.modelName.enum.newsletter: {
          this.mapMainObjectFromSubscribeData(data.model)
          break;
        }
        case this.modelName.enum.accomplishment: {
          this.mapMainObjectFromSubscribeData(data.model)
          this.mapLocationAccomplishmentFromSubscribeData(data.model)
          break;
        }
      }
    })
  }

  isNewsletter(): boolean {
    return this.requestedModalName===this.modelName.enum.newsletter ? true : false
  }

  isAccomplishment(): boolean {
    return this.requestedModalName===this.modelName.enum.accomplishment ? true : false
  }

  mapMainObjectFromSubscribeData(data: any) {
    this.article = {
      title: data!.title,
      content: data!.content,
      isVisible: data!.isVisible,
      creation_date: this.dateService.dateToString(data!.creation_date),
      modified_date: data!.modified_date,
      visibleUntil: data!.visibleUntil,
      image: data!.image,
      location: undefined
    }
  }

  mapLocationAccomplishmentFromSubscribeData(data: any) {
    this.article.location = data!.location
  }


  setOverflowActive(activate: boolean) {
    this.modalActivationService.setIsModalActive(activate)
    this.modalActive()
    this.setIsActive(activate)
    let element = document.getElementById('body');
    if (this.is_active && element) {
      element.style.overflow = 'hidden';
    } else {
      if (element) {
        element.style.overflow = 'visible';
      }
    }
  }

  setIsActive(set_to_active: boolean) {
    this.is_active = set_to_active
  }

  sendActiveState() {
    this.isModalActive.emit(false)
  }

  closeModal() {
    this.sendActiveState()
    this.setOverflowActive(false)
  }

  
  private goTopBtn = document.getElementById('go-top')
  modalActive(): void {
    this.modalActivationService.getIsModalActive$.subscribe(isActive => {
      if (isActive) {
        this.goTopBtn?.classList.add('d-none')
      }
      else {
        this.goTopBtn?.classList.remove('d-none')
      }
    })
  } 
}
