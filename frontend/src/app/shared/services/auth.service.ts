import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../interfaces/user.interface'
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  
  // User related properties (Guards)
  isLogged$ = new BehaviorSubject<boolean>(this.getIsLogged());
  hasRole$ = new BehaviorSubject<boolean>(this.getHasRole());

  // User related properties (App)
  userId$ = new BehaviorSubject<number>(this.getUserId());
  currentUser$ = new BehaviorSubject<User>(this.getCurrentUser());

  // Methods
  signup(params: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, params);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password }).pipe(
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
      })
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

  // Setters
  setCurrentUser(user: User): void {
    this.currentUser$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}