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
  isLogged$ = new BehaviorSubject<boolean>(this.getIsLogged());
  userId$ = new BehaviorSubject<number>(this.getUserId());
  hasRole$ = new BehaviorSubject<boolean>(this.getHasRole());
  currentUser$ = new BehaviorSubject<User>(this.getCurrentUser());

  // HTTP headers
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders(environment.headers)
  };

  // Methods
  signup(params: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, params, this.httpOptions)
    // Send error to ErrorHandler service
    // .pipe(catchError(this.errorHandlerService.handleError<any>('signup')));
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password }, this.httpOptions).pipe(
      map(user => {
        // Login successful if there is a JWT in the response
        if (user && user.token) {

          // Send BehaviorSubjects values to the next operation  
          this.isLogged$.next(true);
          this.userId$.next(user.id);
          this.hasRole$.next(user.hasRole);
          this.currentUser$.next(user);
          
          // Store user details and JWT in local storage to keep user logged in between page refreshes
          localStorage.setItem('isLogged', '1');
          localStorage.setItem('userId', JSON.stringify(user.id));
          localStorage.setItem('hasRole', JSON.stringify(user.hasRole));
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          
          // Redirect to home page
          this.router.navigate(['home']);
        }

        return user;
      }),
      // Send error to ErrorHandler service
      // catchError(this.errorHandlerService.handleError<any>('login'))
    );
  }

  updateHasRole(id: number, hasRole: boolean): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/auth/updateHasRole`, { id, hasRole }, this.httpOptions).pipe(
      map(res => {
        this.hasRole$.next(hasRole);
        localStorage.setItem('hasRole', JSON.stringify(hasRole));
        
        let user = this.getCurrentUser();
        user.hasRole = hasRole
        localStorage.setItem('user', JSON.stringify(user));

        return res;
      }),
      // Send error to ErrorHandler service  
      // .pipe(catchError(this.errorHandlerService.handleError<any>('updateHasRole'))
    );
  }

  logout(): void {
    this.isLogged$.next(false);
    
    localStorage.removeItem('isLogged');
    localStorage.removeItem('userId');
    localStorage.removeItem('hasRole');
    localStorage.removeItem('user');
    localStorage.removeItem('token');    

    this.router.navigate(['/user/login']);
  }

  // Getters
  private getIsLogged(): boolean {
    const isLogged = localStorage.getItem('isLogged');
    return (isLogged === '1');
  }

  private getUserId(): number {
    const userId = localStorage.getItem('userId')
    return parseInt(userId);
  }

  private getHasRole(): boolean {
    const hasRole = localStorage.getItem('hasRole');
    return JSON.parse(hasRole);
  }

  private getCurrentUser(): User {
    const user = localStorage.getItem('user')
    return JSON.parse(user);
  }
}

// public getMovies(): Observable<Movie[]>{
//   return this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
// }

// public getMovieById(id: number): Observable<Movie> {
//   return this.http.get<Movie>(`${environment.apiUrl}/movies/${id}`);
// }

// public updateMovie(movie: Movie, id: number): Observable<Movie>{
//   return this.http.patch<Movie>(`${environment.apiUrl}/movies/${id}`, movie);
// }

// public createMovie(movie: Movie): Observable<Movie>{
//   return this.http.post<Movie>(`${environment.apiUrl}/movies`, movie);
// }

// public deleteMovie(id: number): Observable<Movie>{
//   return this.http.delete<Movie>(`${environment.apiUrl}/movies/${id}`);
// }