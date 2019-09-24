import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input() customText = 'Tu pedido ha sido confirmado, te mantendremos informado ante nuevas novedades';
  public opened = false;

  constructor() {}

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }
}
