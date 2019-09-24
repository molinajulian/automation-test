import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CouponsService } from '../../services/coupons.service';
import { OrderConfirmation } from '../../models/order.model';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent {
  opened = false;
  offer: Offer;
  couponControl: FormControl;
  private confirmOrder = new BehaviorSubject<OrderConfirmation>({ confirm: false, coupon: '' });
  confirmOrderEvent = this.confirmOrder.asObservable();

  constructor(private couponsService: CouponsService) {
    this.resetOffer();
    this.couponControl = new FormControl();
  }

  open(offer: Offer) {
    this.offer = offer;
    this.opened = true;
    this.couponControl.setValue('');
  }

  close() {
    this.resetOffer();
    this.opened = false;
  }

  confirmOder() {
    this.opened = false;
    this.couponsService.removeFreeCouponList(this.couponControl.value);
    this.confirmOrder.next({ confirm: true, coupon: this.couponControl.value });
  }

  resetOffer() {
    this.offer = {
      id: '',
      date: '',
      price: 0,
      description: '',
      shipping_cost: 0,
      local: '',
      address: ''
    };
  }
}
