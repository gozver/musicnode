// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// rxjs
import { Observable, BehaviorSubject } from 'rxjs';
import { first, tap, catchError } from 'rxjs/operators';

// custom
import { environment } from '@environments/environment';
import { User } from '../interfaces/user.interface'
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root' // so we don't have to import it in the module
})
export class AuthService {

  // BehaviorSubject: requires an initial value and emits the current value to new subscribers
  isUserLogedIn$ = new BehaviorSubject<boolean>(false);
  userId!: Pick<User, 'id'>;

  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',      
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) { }

  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<{
    token: string,
    userId: Pick<User, 'id'>
  }> {
    return this.http
      .post<{ token: string, userId: Pick<User, "id"> }>(`${environment.apiUrl}/auth/login`, { email, password }, this.httpOptions)
      .pipe(
        first(), // only the first value
        tap(( tokenObj: { token: string, userId: Pick<User, 'id'> }) => {
          this.userId = tokenObj.userId;
          localStorage.setItem('token', tokenObj.token); // save token in local storage
          this.isUserLogedIn$.next(true);
          this.router.navigate(['home']);
        }),
        catchError(this.errorHandlerService.handleError<{ token: string, userId: Pick<User, "id"> }>('login'))
      );
  }

  signup(params: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, params, this.httpOptions)
      .pipe(
        first(), // only the first value
        catchError(this.errorHandlerService.handleError<any>('signup', 'no response for this error'))
      );
  }
}
