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
  userId$ = new BehaviorSubject<number>(this.getUserId());

  // HTTP headers
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',      
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
  };

  signup(params: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, params, this.httpOptions).pipe(      
      catchError(this.errorHandlerService.handleError<any>('signup'))
    );
  }

  login(email: string, password: string): Observable<User> {

    // pipe() let you combine multiple functions into a single function
    // pipe() runs the composed functions in sequence
    
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password }, this.httpOptions).pipe(
      map(user => {

        // Login successful if there is a JWT in the response
        if (user && user.token) {

          // Send isAuthenticated$ and userId$ to the next operation  
          this.isLogged$.next(true);
          this.userId$.next(user.id);
          
          // Store user details and JWT in local storage to keep user logged in between page refreshes
          localStorage.setItem('isLogged', '1');
          localStorage.setItem('userId', JSON.stringify(user.id));

          localStorage.setItem('token', user.token);
          localStorage.setItem('name', user.name);
          localStorage.setItem('surname', user.surname);
          localStorage.setItem('email', user.email);
          localStorage.setItem('phone', user.phone);

          // Redirect to home page
          this.router.navigate(['home']);
        }

        return user;
      }),
      catchError(this.errorHandlerService.handleError<any>('login'))
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

  getUserId(): number {
    const userId = localStorage.getItem('userId')
    return parseInt(userId);
  }
}
