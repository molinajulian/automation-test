import { Component, OnInit, HostListener } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { Chance } from 'src/app/services/chance.service';

@Component({
  selector: 'app-coupon-modal',
  templateUrl: './coupon-modal.component.html',
  styleUrls: ['./coupon-modal.component.scss']
})
export class CouponModalComponent implements OnInit {
  opened = false;
  couponCode: string;
  chance = new Chance();
  @HostListener('click', ['$event']) onClick(event) {
    if (event.target.id === 'coupon-modal') {
      this.close();
    }
  }

  constructor(
    private modalService: ModalService,
    private authService: AuthenticationService,
    private couponsService: CouponsService
  ) {}

  ngOnInit() {
    this.modalService.modalStatusChange.subscribe(value => {
      if (value) {
        this.couponCode = this.chance.getRandomString({ length: 15 });
        const userlogger = this.authService.getUser();
        this.couponsService.registerFreeCoupon(this.couponCode, userlogger);
      }
      this.opened = value;
    });
  }

  close() {
    this.modalService.close();
  }
}
