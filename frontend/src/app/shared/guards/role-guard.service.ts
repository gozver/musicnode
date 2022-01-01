// Angular
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// RxJS
import { Observable } from 'rxjs';

// Services
import { AuthService } from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  /**
   * @description Function which tells the router whether or not it should allow navigation to a requested route
   * @returns Observable
   */
  canActivate(): Observable<boolean> {
    // If the user has no role, redirect to role manager
    if (!this.authService.hasRole$.value) {
      this.router.navigate(['/role']);
    }

    // If the user has role, return an Observable which value is true
    return this.authService.hasRole$;
  }

}
