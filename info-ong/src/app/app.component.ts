import { AfterContentChecked, AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { HeaderComponent } from './header/header.component';
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';
import { ModalComponent } from './modal/modal.component';
import { HttpNewsletterService } from '../services/httpNewsletter.service';
import { HttpAccomplishmentService } from '../services/httpAccomplishments.service';
import { HomeComponent } from './home/home.component';
import { NewsletterPageComponent } from './newsletter-page/newsletter-page.component';
import { AccomplishmentPageComponentComponent } from './accomplishment-page-component/accomplishment-page-component.component';
import { exceptedURLScrollToTop } from '../config/exceptedUrlToScrollTop';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ComponentSwitchService } from '../services/componentSwitch.service';
import { ComponentName } from '../variables/componentName';
import { ToastComponent } from './toast/toast.component';
import { LocalStorageService } from '../services/localStorage.service';
import { ToastService } from '../services/toast.service';
import { version } from '../variables/appVersion';
import { HttpModalTextService } from '../services/httpModalText.service';
import { ModalService } from '../services/modal.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TopNavbarComponent,
    HeaderComponent,
    BottomNavbarComponent,
    ModalComponent,
    NewsletterPageComponent,
    HomeComponent,
    AccomplishmentPageComponentComponent,
    ToastComponent
  ],
  providers: [
    HttpNewsletterService,
    HttpAccomplishmentService,
    HttpModalTextService,
    ModalService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements AfterContentChecked {
  title = "Equipe d'Urgence pour la Biodiversité";
  private _isModalActive = false;
  constructor(
    private componentName: ComponentName,
    private componentSwitchService: ComponentSwitchService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    if(this.localStorageService.setClientAppVersion()) {
      this.toastService.setMessage(`Le site a été récemment mis à jour à la version ${version.currentVesion}`)
      this.toastService.setShowToast(true)
    }
  }

  ngAfterContentChecked(): void {

    if (window.location.pathname === "/") {
      this.componentSwitchService.setActualComponent(this.componentName.enum.home)
    }

    let element = document.getElementById('top');

    if (element !== null && !exceptedURLScrollToTop.includes(window.location.href)) {
      element.scrollIntoView()
    }
  }
}
