import { Component } from '@angular/core';
import { NewsletterComponent } from '../newsletter/newsletter.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { AccomplishmentsComponent } from '../accomplishments/accomplishments.component';
import { CommonModule } from '@angular/common';
import { HttpAccomplishmentService } from '../../services/httpAccomplishments.service';
import { HttpNewsletterService } from '../../services/httpNewsletter.service';
import { ComponentToModalDataPassingService } from '../../services/ComponentToModalDataPassing.service';
import { ModalComponent } from '../modal/modal.component';
import { ComponentSwitchService } from '../../services/componentSwitch.service';
import { ComponentName } from '../../variables/componentName';
import { ModalActivityComponent } from '../modal-activity/modal-activity.component';
import { HttpModalTextService } from '../../services/httpModalText.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NewsletterComponent,
    MainContentComponent,
    AccomplishmentsComponent,
    AboutUsComponent,
    ModalComponent,
    ModalActivityComponent
  ],
  providers: [
    HttpNewsletterService,
    HttpAccomplishmentService,
    HttpModalTextService,
    ComponentToModalDataPassingService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent{
  private actualActiveComponent: string = ""
  private _isModalActive = false;

  constructor(
    private componentName: ComponentName,
    private componentSwitchService: ComponentSwitchService
  ) {
    this.componentSwitchService.actualComponent$
      .subscribe(componentName => {
        this.actualActiveComponent = componentName;
      })
  }

  isThisComponentActive(): boolean {
    return (this.actualActiveComponent === this.componentName.enum.home) ? true : false
  }

  getIsModalActive(): boolean {
    return this._isModalActive;
  }
  setIsModalActive(value: boolean) {
    this._isModalActive = value;
  }

}
