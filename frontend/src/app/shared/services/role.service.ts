import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Role } from '../interfaces/role.interface'
import { Band } from '../interfaces/band.interface';
import { Company } from '../interfaces/company.interface';

import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private http: HttpClient,    
    private errorHandlerService: ErrorHandlerService
  ) { }

  createRole(email: string, role: any): Observable<any> {
    const params = { email, role };
    
    return this.http.post<any>(`${environment.apiUrl}/role/old`, params);
  }

  createRoleAndEntity(roleForm: Role, bandForm: Band, companyForm: Company): Observable<any> {
    const params = { roleForm, bandForm, companyForm };
    
    return this.http.post<any>(`${environment.apiUrl}/role/new`, params);
  }

  getRolesByUserId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/role/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getRolesByUserId', []))
    );
  }

  getRoleById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/role/id/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getRoleById', null))
    );
  }

  deleteRole(id: number, uid: number, bid: number, cid: number): Observable<any> {
    return this.http.delete<Role>(`${environment.apiUrl}/role/${id}/${uid}/${bid}/${cid}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('deleteRole', null))
    );
  }
}
