// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// RxJS
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services, interfaces and environment variables
import { UserRole } from './../interfaces/user-role.interface';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders(environment.headers)
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getUserRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${environment.apiUrl}/user-role`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<UserRole[]>('getUserRoles', []))
    );
  }

  findByUserId(userId: number): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${environment.apiUrl}/user-role/${userId}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<UserRole[]>('findByUserId', []))
    );
  }

  create(params: UserRole): Observable<UserRole> {
    return this.http.post<UserRole>(`${environment.apiUrl}/user-role`, params, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<UserRole>('create', null))
    );
  }
}
