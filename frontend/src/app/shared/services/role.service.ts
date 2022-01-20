import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Role } from '../interfaces/role.interface'
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

  create(name: string): Observable<Role> {
    return this.http.post<Role>(`${environment.apiUrl}/role`, name).pipe(
      catchError(this.errorHandlerService.handleError<any>('create', null))
    );
  }
}
