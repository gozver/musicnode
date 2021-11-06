// Angular
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// RxJS
import { Observable } from 'rxjs';

// Services
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * @description Function which tells the router whether or not it should allow navigation to a requested route
   * @returns Observable
   */
  canActivate(): Observable<boolean> {
    // If the user is not logged in, redirect to login
    if (!this.authService.isLogged$.value) {
      this.router.navigate(['/user/login']);
    }

    // If the user is logged in, return an Observable which value is true
    return this.authService.isLogged$;
  }

}
