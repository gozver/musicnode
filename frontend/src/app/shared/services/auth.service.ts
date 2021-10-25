// Angular 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// RxJS
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { first, tap, map, catchError } from 'rxjs/operators';

// Services, interfaces and environment variables
import { ErrorHandlerService } from './error-handler.service';
import { User } from '../interfaces/user.interface'
import { environment } from '@environments/environment';

/**
 * The @Injectable decorator has been applied to the AuthService class.
 * This decorator is used to tell Angular that this class will be used as a service.
 * By doing this, other classes are allowed to access to the functionality of this service through a feature called dependency injection.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) { }
  
  /**
   * A BehaviorSubject is a type of subject.
   * A subject is a type of observable that requires an initial value that can be changed and emits its current value to new subscribers.
   */

  // User related properties
  isLogged$ = new BehaviorSubject<boolean>(this.checkLoginStatus());
  name$ = new BehaviorSubject<string>(localStorage.getItem('name'));
  surname$ = new BehaviorSubject<string>(localStorage.getItem('surname'));
  userId: number;

  // userId!: Pick<User, 'id'>;

  // HTTP headers
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',      
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
  };

  // Login method
  login(email: string, password: string): Observable<User> {

    // pipe() let you combine multiple functions into a single function
    // pipe() runs the composed functions in sequence
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password }, this.httpOptions).pipe(
      map(user => {

        // Login successful if there is a JWT in the response
        if (user && user.token) {
          
          // Send isAuthenticated$ with its value set to true to the next operation  
          this.isLogged$.next(true);
          
          // Store user details and JWT in local storage to keep user logged in between page refreshes
          localStorage.setItem('isLogged', '1');          
          localStorage.setItem('token', user.token);          
          localStorage.setItem('name', user.name);
          localStorage.setItem('surname', user.surname);
          localStorage.setItem('email', user.email);
          localStorage.setItem('phone', user.phone);

          this.name$.next(localStorage.getItem('name'));
          this.surname$.next(localStorage.getItem('surname'));

          // Redirect to home page
          this.router.navigate(['home']);
        }

        return user;
      }),
    );
  }

  logout(): void {
    this.isLogged$.next(false);
    
    localStorage.removeItem('isLogged');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');

    this.router.navigate(['/user/login']);
  }

  checkLoginStatus(): boolean {
    const isLogged = localStorage.getItem('isLogged');
    return (isLogged === '1');
  }




















  // login(email: Pick<User, 'email'>, password: Pick<User, 'password'>): Observable<{ token: string, userId: Pick<User, 'id'> }> {
  //   return this.http.post<{ token: string, userId: Pick<User, "id"> }>(`${environment.apiUrl}/auth/login`, { email, password }, this.httpOptions).pipe(
  //     // first(), // only the first value
  //     // tap(( tokenObj: { token: string, userId: Pick<User, 'id'> }) => {
  //     //   this.userId = tokenObj.userId;
  //     //   localStorage.setItem('token', tokenObj.token); // save token in local storage
        
  //     //   this.userIsLoggedIn$.next(true);
  //     //   this.router.navigate(['home']);
  //     // }),
  //     catchError(this.errorHandlerService.handleError<{ token: string, userId: Pick<User, "id"> }>('login'))
  //   );
  // }
  


  signup(params: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, params, this.httpOptions)
      .pipe(
        first(), // only the first value
        catchError(this.errorHandlerService.handleError<any>('signup', 'no response for this error'))
      );
  }
}
