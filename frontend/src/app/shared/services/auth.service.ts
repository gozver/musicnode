// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Services, interfaces and environment variables
import { User } from '../interfaces/user.interface'
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

/**
 * @Injectable Decorator which tells Angular that this class will be used as a service.
 * By doing this, other classes are allowed to access to the functionality of this service through a feature called dependency injection.
 * 
 * @Subject RxJS Observable which can have multiple subscribers.
 * @BehaviorSubject Subject which stores the current value.
 * @pipe Let you combine multiple functions into a single function and runs the composed functions in sequence
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
  
  // User related properties
  isLogged$ = new BehaviorSubject<boolean>(this.getLoginStatus());
  userId$ = new BehaviorSubject<number>(this.getUserId());
  currentUser$ = new BehaviorSubject<User>(this.getCurrentUser());

  // HTTP headers
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders(environment.headers)
  };

  // Methods
  signup(params: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, params, this.httpOptions).pipe(      
      catchError(this.errorHandlerService.handleError<any>('signup'))
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password }, this.httpOptions).pipe(
      map(user => {
        // Login successful if there is a JWT in the response
        if (user && user.token) {

          // Send isAuthenticated$ and userId$ to the next operation  
          this.isLogged$.next(true);
          this.userId$.next(user.id);
          this.currentUser$.next(user);
          
          // Store user details and JWT in local storage to keep user logged in between page refreshes
          localStorage.setItem('isLogged', '1');
          localStorage.setItem('userId', JSON.stringify(user.id));
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          
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
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('token');    

    this.router.navigate(['/user/login']);
  }

  // Getters
  private getLoginStatus(): boolean {
    const isLogged = localStorage.getItem('isLogged');
    return (isLogged === '1');
  }

  private getUserId(): number {
    const userId = localStorage.getItem('userId')
    return parseInt(userId);
  }

  private getCurrentUser(): User {
    const user = localStorage.getItem('user')
    return JSON.parse(user);
  }
}
