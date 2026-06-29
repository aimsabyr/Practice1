import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {

  console.log('=== AUTH GUARD START ===');

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await authService.getCurrentUserAsync();

  console.log('Current User:', user);

  if (user) {

    console.log('Access granted');

    return true;

  }

  console.log('Access denied');

  router.navigate(['/login']);

  return false;

};