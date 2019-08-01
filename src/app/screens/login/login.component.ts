import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export const LOGIN_ERRORS = {
  username: {
    maxlength: 'El usuario debe contener entre 6 y 20 caracteres',
    minlength: 'El usuario debe contener entre 6 y 20 caracteres',
    pattern: 'El usuario debe ser alfanumérico',
    required: 'El usuario es requirido',
  },
  password: {
    maxlength: 'La contraseña debe contener entre 8 y 14 caracteres',
    minlength: 'La contraseña debe contener entre 8 y 14 caracteres',
    required: 'La contraseña requirida',
  }
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.formBuilder = new FormBuilder();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z]*'),
        Validators.maxLength(20),
        Validators.minLength(6)],
      )],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(14),
        Validators.minLength(8)]
      )]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.router.navigateByUrl('/coupons');
    }
  }

  getErrorMessage(control: string): string {
    const controlErrors = this.loginForm.get(control).errors;
    let errorMessage = '';
    if (controlErrors) {
      const errorKey = Object.keys(controlErrors)[0];
      errorMessage = LOGIN_ERRORS[control][errorKey];
    }
    return errorMessage;
  }

  validateSubmitDisabled(): boolean {
    return this.loginForm.value.password === '' || this.loginForm.value.username === '';
  }
}
