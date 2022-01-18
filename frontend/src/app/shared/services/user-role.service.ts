import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserRole } from './../interfaces/user-role.interface';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getUserRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${environment.apiUrl}/user-role`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getUserRoles', []))
    );
  }

  findByRoleId(roleId: number): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${environment.apiUrl}/user-role/role/${roleId}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getUserRolesByRoleId', []))
    );
  }

  findByUserId(userId: number): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${environment.apiUrl}/user-role/${userId}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('findByUserId', []))
    );
  }

  createUserRole(params: UserRole): Observable<UserRole> {
    return this.http.post<UserRole>(`${environment.apiUrl}/user-role`, params).pipe(
      catchError(this.errorHandlerService.handleError<any>('createUserRole', null))
    );
  }
}
