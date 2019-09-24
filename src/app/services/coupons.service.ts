import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  constructor(private localStorage: LocalStorageService) {}
  freeCouponList = [];
  hasWelcomeCoupon = false;
  registerFreeCoupon(coupon: string, user: string): void {
    const freeCouponKey = this.localStorage.FREE_COUPON;
    this.freeCouponList = this.getFreeCouponsList();
    this.freeCouponList.push({
      username: user,
      code: coupon,
      date: '2019-12-31',
      description: 'Cupón de Bienvenida'
    });
    this.localStorage.setValue(freeCouponKey, this.freeCouponList);
  }

  private getFreeCouponsList() {
    return this.localStorage.getValue(this.localStorage.FREE_COUPON) || [];
  }

  removeFreeCouponList(coupon: String): void {
    this.freeCouponList = this.freeCouponList.filter(({ code }) => code !== coupon);
  }

  hasValidCoupon(coupon: String): Boolean {
    const freeCouponList = this.getFreeCouponsList();
    return freeCouponList.some(({ code }) => code === coupon);
  }

  getUserCoupons(user: string): any[] {
    console.log(this.freeCouponList);
    const coupons = [];
    this.freeCouponList.forEach(element => {
      if (user === element.username) {
        coupons.push(element);
      }
    });
    return coupons;
  }

  userHasCoupons(username: string): boolean {
    return this.getUserCoupons(username).length !== 0;
  }
}
