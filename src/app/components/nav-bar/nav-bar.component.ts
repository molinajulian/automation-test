import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    title: 'Información personal'
  }
];

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  menuItems = MENU_ITEMS;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  onLogout() {
    this.localStorage.removeValue(this.localStorage.SESSION_TOKEN);
    this.router.navigateByUrl('/login');
  }
}
