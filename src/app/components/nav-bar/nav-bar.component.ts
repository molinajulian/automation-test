import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

export const MENU_ITEMS = [
  {
    url: '/home',
    title: 'Inicio'
  },
  {
    url: '/coupons',
    title: 'Cupones'
  },
  {
    url: '/profile',
    title: 'Perfil'
  }
];

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  userLogged: string;
  menuItems = MENU_ITEMS;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private modalService: ModalService,
    private couponsService: CouponsService,
    private localStorageService: LocalStorageService
  ) {
    this.userLogged = this.authService.getUser();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  openCouponModal() {
    this.modalService.open();
  }

  showFreeCouponButton(): boolean {
    return !this.localStorageService.getValue(this.localStorageService.FREE_COUPON);
  }
}
