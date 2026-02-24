import { Component } from '@angular/core';
import { ModalMessageService } from '../../services/modalMessage.service';
import { IMessage } from '../../interfaces/modalMessage.interface';
import { Message } from '../../variables/modalMessage';
import { HttpModalTextService } from '../../services/httpModalText.service';
import { ModalTextModel } from '../../models/modal_text.model';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-modal-activity',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-activity.component.html',
  styleUrl: './modal-activity.component.css'
})
export class ModalActivityComponent {
  public modalTextDisplay: any 
  private title = ''

  constructor(
    private modalMessageService: ModalMessageService,
    private httpModalTextService: HttpModalTextService,
    public modalService: ModalService,
    public spinnerService: SpinnerService
  ) {
    this.title = this.modalService.getModalTitle()
    this.spinnerService.setActivate(true)
    this.fetchModalContent()
  }

  fetchModalContent(): Promise<void> {
    return new Promise((resolve, reject) => {
      const response = this.httpModalTextService.fetchModalContentByTitle(this.title);
      response.subscribe(async data => {
        this.modalTextDisplay = data
        resolve()
        this.spinnerService.setActivate(false)
      }), () => {
        reject()
      }
    })
  }
}
