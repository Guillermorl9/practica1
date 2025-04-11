import { CanActivateFn } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import { inject } from "@angular/core";
import { Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    filter(user => user !== null),
    take(1),
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
