import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { InputComponent } from './components/input/input.component';
import { FormSubmitDirective } from './directives/form-submit.directive';
import { CouponsComponent } from './screens/coupons/coupons.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './screens/home/home.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputComponent,
    FormSubmitDirective,
    CouponsComponent,
    NavBarComponent,
    HomeComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
