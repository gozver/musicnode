import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Company } from '../interfaces/company.interface'
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(
    private http: HttpClient,    
    private errorHandlerService: ErrorHandlerService
  ) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.apiUrl}/company`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getCompanies', []))
    );
  }

  createCompany(company: Company, userId: number): Observable<Company> {
    return this.http.post<Company>(`${environment.apiUrl}/company`, { company, userId }).pipe(
      catchError(this.errorHandlerService.handleError<any>('createCompany', null))
    );
  }
}
