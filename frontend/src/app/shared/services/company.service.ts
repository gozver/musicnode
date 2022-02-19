import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  createCompany(company: Company, userId: number): Observable<Company> {
    return this.http.post<Company>(`${environment.apiUrl}/company`, { company, userId }).pipe(
      catchError(this.errorHandlerService.handleError<any>('createCompany', null))
    );
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.apiUrl}/company`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getCompanies', []))
    );
  }

  getCompaniesByParams(searchParams: any): Observable<Company[]> {
    let httpParams = new HttpParams();

    if (searchParams) {
      for (const key in searchParams) {
        if (searchParams.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, searchParams[key]);
        }
      }
    }

    const options = { params: httpParams };

    return this.http.get<Company[]>(`${environment.apiUrl}/company/params`, options).pipe(
      catchError(this.errorHandlerService.handleError<any>('getCompaniesByParams', []))
    );
  }
}
