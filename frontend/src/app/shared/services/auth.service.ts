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
  isLogged$ = new BehaviorSubject<boolean>(this.getIsLogged());
  hasRole$ = new BehaviorSubject<boolean>(this.getHasRole());
  activeRole$ = new BehaviorSubject<number>(this.getActiveRole());
  currentUser$ = new BehaviorSubject<User>(this.getCurrentUser());

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  
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
          this.hasRole$.next(user.hasRole);
          this.activeRole$.next(user.activeRole);
          this.currentUser$.next(user);
          
          // Store user details and JWT in local storage to keep user logged in between page refreshes
          localStorage.setItem('isLogged', '1');
          localStorage.setItem('hasRole', JSON.stringify(user.hasRole));
          localStorage.setItem('activeRole', JSON.stringify(user.activeRole));
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
    this.hasRole$.next(false);
    this.activeRole$.next(null);
    this.currentUser$.next(null);

    localStorage.removeItem('isLogged');
    localStorage.removeItem('hasRole');
    localStorage.removeItem('activeRole');
    localStorage.removeItem('user');
    localStorage.removeItem('token');    

    this.router.navigate(['/user/login']);
  }

  // Getters
  private getIsLogged(): boolean {
    const isLogged = localStorage.getItem('isLogged');
    return (isLogged === '1');
  }

  private getHasRole(): boolean {
    const hasRole = localStorage.getItem('hasRole');
    return JSON.parse(hasRole);
  }
  
  private getActiveRole(): number {
    const activeRole = localStorage.getItem('activeRole');
    return JSON.parse(activeRole);
  }

  private getCurrentUser(): User {
    const user = localStorage.getItem('user')
    return JSON.parse(user);
  }

  // Setters
  setHasRole(hasRole: boolean): void {
    this.hasRole$.next(hasRole);
    localStorage.setItem('hasRole', JSON.stringify(hasRole));
  }
  
  setActiveRole(activeRole: number): void {
    this.activeRole$.next(activeRole);
    localStorage.setItem('activeRole', JSON.stringify(activeRole));
  }
  
  setCurrentUser(user: User): void {
    this.currentUser$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}