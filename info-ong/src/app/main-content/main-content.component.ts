import { Component } from '@angular/core';
import { ModalActivityComponent } from '../modal-activity/modal-activity.component';
import { ModalActivationService } from '../../services/modalActivate.service';
import { ModalTextModel } from '../../models/modal_text.model';
import { HttpModalTextService } from '../../services/httpModalText.service';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    ModalActivityComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  modalActive: boolean = false

  constructor(
    public modalService: ModalService,
    private http_modal_content: HttpModalTextService
  ) {
    this.modalActive = this.modalService.getActiveStatus()
  }
  
  activateModal(active: boolean) {
    this.modalService.setActiveStatus(active)
  }



}
