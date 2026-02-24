import { Location } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  NgbNavItem,
  NgbNavOutlet, 
  NgbNavLink, 
  NgbNavContent,
  NgbNav
} from '@ng-bootstrap/ng-bootstrap';
import { ComponentSwitchService } from '../../services/componentSwitch.service';
import { ComponentName } from '../../variables/componentName';


@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [
    NgbNavItem,
    NgbNavOutlet,
    NgbNavLink,
    NgbNavContent,
    NgbNav,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  constructor(
    private componentName: ComponentName,
    private componentSwitchService: ComponentSwitchService,
  ) {}
  public active: string = ""
  
  ngOnInit() {
    this.collapseMenu()
  }

  setActiveTab(activeTabName: string) {
    if (activeTabName) {
      this.active = activeTabName
    }
  }

  // setActiveClassToTab (activeTabId: string) {
  //   let elements = document.getElementsByClassName('navBtn')
  //   Array.from(elements).forEach(element => {
  //     element.setAttribute('RouterLinkActive')
  //   })
  //   document.getElementById(activeTabId)?.setAttribute('RouterLinkActive', 'active')
  // }

  setActiveComponent(componentName: string): void {
    switch (componentName) {
      case "newsletter":
        this.componentSwitchService.setActualComponent(this.componentName.enum.newsletter)
        break;
      case "accomplishment":
        this.componentSwitchService.setActualComponent(this.componentName.enum.accomplishment)
        break;
      default:
        this.componentSwitchService.setActualComponent(this.componentName.enum.home)
    }
  }

  collapseMenu() {
    let nav = document.getElementById('navbarSupportedContent2')
    let menu_btn = document.getElementById('menu-btn')

    if (nav?.classList.contains('show')) {
      nav?.classList.remove('show')
      menu_btn?.classList.add('collapsed')
    }
  }
}
