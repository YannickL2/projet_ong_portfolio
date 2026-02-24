import { Component, EventEmitter, Output } from '@angular/core';
import { HttpAccomplishmentService } from '../../services/httpAccomplishments.service';
import { AccomplishmentModel } from '../../models/accomplishment.model';
import { DateParseService } from '../../services/dateParse.service';
import { ComponentName } from '../../variables/componentName';
import { ComponentSwitchService } from '../../services/componentSwitch.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentToModalDataPassingService } from '../../services/ComponentToModalDataPassing.service';
import { ModelName } from '../../variables/modelName';
import { PreviewTextService } from '../../services/previewTextContent.service';
import { ModalService } from '../../services/modal.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-accomplishments',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './accomplishments.component.html',
  styleUrl: './accomplishments.component.css'
})
export class AccomplishmentsComponent {

  @Output() isModalActive = new EventEmitter<boolean>()
  preview_content: string | undefined
  creation_date: string | undefined
  latestAccomplishment: AccomplishmentModel | undefined
  
  constructor(
    private httpService: HttpAccomplishmentService,
    private dateService: DateParseService,
    private componentSwitchingService: ComponentSwitchService,
    private componentName: ComponentName,
    private componentToModalDataPassingService: ComponentToModalDataPassingService,
    private modelName: ModelName,
    private previewTextService: PreviewTextService,
    public modalService: ModalService,
    public spinnerService: SpinnerService
    ) {
      this.spinnerService.setActivate(true)
      this.fetchLastAccomplishment()
    }

    fetchLastAccomplishment(): Promise<void> {
      return new Promise((resolve, reject) => {
        const response = this.httpService.fetchLastAccomplishment()
        response.subscribe(async data => {
          this.latestAccomplishment = {
            title: data.title,
            content: data.content,
            isVisible: data.isVisible,
            creation_date: data.creation_date,
            modified_date: data.modified_date,
            visibleUntil: data.visibleUntil,
            image: data.image,
            location: data.location
          }
          this.creation_date = this.dateService.dateToString(this.latestAccomplishment!.creation_date);
          this.preview_content = this.previewTextService.getFirstSpaceAfterHundredChar(this.latestAccomplishment?.content)
          resolve()
          this.spinnerService.setActivate(false)
        }), () =>
        {
          reject()
        }
      })
    }

    sendActiveState() {
      this.sendingData()
      this.isModalActive.emit(true)
    }

    sendingData() {
      this.componentToModalDataPassingService.setDataToModal(
        this.modelName.enum.accomplishment,
        this.latestAccomplishment!
        )
    }

    sendComponentToActivate() {
      this.componentSwitchingService.setActualComponent(this.componentName.enum.accomplishment)
    }
  
}
