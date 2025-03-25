import { CanActivateFn } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { inject } from "@angular/core";
import { Router } from '@angular/router';
import { map, take, first } from 'rxjs/operators';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
