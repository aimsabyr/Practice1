import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;

  hidePassword = true;
  loading = false;
  message = '';
  success = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  async register(): Promise<void> {

    if (this.registerForm.invalid) {

      this.success = false;
      this.message = 'Пожалуйста, заполните все обязательные поля корректно.';

      return;

    }

    this.loading = true;
    this.message = '';

    const email = this.registerForm.value.email as string;
    const password = this.registerForm.value.password as string;

    try {

      await this.authService.register(email, password);

      this.success = true;
      this.message = 'Регистрация успешно завершена.';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1200);

    } catch (error) {

      console.error(error);

      this.success = false;
      this.message = 'Пользователь с таким адресом электронной почты уже существует.';

    } finally {

      this.loading = false;

    }

  }

}