// angular
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';

// custom service
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
   * interface which tell the router whether or not it should allow navigation to a requested route 
   */
  canActivate(): Observable<boolean> {
    // if the user is not logged redirect to login
    if (!this.authService.isLogged$.value) {
      this.router.navigate(['/user/login']);
    }

    // if the user is logged in return an observable which value is true
    return this.authService.isLogged$;
  }

}
