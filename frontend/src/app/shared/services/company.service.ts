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

  getCompany(id: number): Observable<Company> {
    return this.http.get<any>(`${environment.apiUrl}/company/${id}`);
  }

  updateAvatar(id: number, avatar: File): Observable<string> {
    const formData = new FormData();

    formData.append('id', id.toString());
    formData.append('file', avatar, avatar.name);

    return this.http.patch<any>(`${environment.apiUrl}/company`, formData).pipe(
      catchError(this.errorHandlerService.handleError<any>('updateAvatar', null))
    );
  }

  updateImages(id: number, imagesList: any): Observable<string> {
    const formData = new FormData();
    
    formData.append('id', id.toString());

    for (let i = 0; i < imagesList.length; i++) {
      formData.append('files', imagesList[i], imagesList[i].name);
    }

    return this.http.patch<any>(`${environment.apiUrl}/company/multi`, formData).pipe(
      catchError(this.errorHandlerService.handleError<any>('updateImages', null))
    );
  }

  deleteImages(id: number): Observable<any> { // controller return deleted items
    return this.http.delete<any>(`${environment.apiUrl}/company/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('deleteImages', null))
    );
  }
}
