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

  createRole(roleForm: Role, bandForm: Band, companyForm: Company): Observable<any> {
    const params = { roleForm, bandForm, companyForm };
    
    return this.http.post<any>(`${environment.apiUrl}/role`, params);
  }

  getRolesByUserId(id: number): Observable<any[]> { // controller return role model with includes
    return this.http.get<any[]>(`${environment.apiUrl}/role/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getRolesByUserId', []))
    );
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete<Role>(`${environment.apiUrl}/role/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('deleteRole'))
    );
  }
}
