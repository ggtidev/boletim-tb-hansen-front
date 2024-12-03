import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('authenticated') === 'true') {
        const userId = urlParams.get('user_id');
        const grupo = urlParams.get('grupo');

        if (userId && grupo) {
          this.authService.setUserData(userId, grupo);
          this.authService.setAuthenticated(true);
        } else {
          console.error('Parâmetros ausentes na URL:', { userId, grupo });
        }

        urlParams.delete('authenticated');
        urlParams.delete('user_id');
        urlParams.delete('grupo');
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

        return true;
      }
    }

    this.router.navigate(['/access-denied']);
    setTimeout(() => {
      this.router.navigate(['/login-redirect']);
    }, 5000);

    return false;
  }
}
