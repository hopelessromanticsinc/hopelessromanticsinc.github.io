import { Component, inject, TemplateRef } from '@angular/core';
import {
  ModalDismissReasons,
  NgbAlertModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cookienotice',
  templateUrl: './cookienotice.component.html',
  styleUrls: ['./cookienotice.component.scss'],
})
export class CookienoticeComponent {
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
