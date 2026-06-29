import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  hidePassword = true;
  loading = false;
  message = '';
  success = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  async login(): Promise<void> {

    if (this.loginForm.invalid) {

      this.success = false;
      this.message = 'Пожалуйста, заполните все обязательные поля.';

      return;

    }

    this.loading = true;
    this.message = '';

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    try {

      await this.authService.login(email, password);

      this.success = true;
      this.message = 'Вход выполнен успешно.';

      this.router.navigate(['/dashboard']);

    } catch (error) {

      console.error(error);

      this.success = false;
      this.message = 'Неверный адрес электронной почты или пароль.';

    } finally {

      this.loading = false;

    }

  }

}