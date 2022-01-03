// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// RxJS
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services, interfaces and environment variables
import { Company } from '../interfaces/company.interface'
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders(environment.headers)
  };

  constructor(
    private http: HttpClient,    
    private errorHandlerService: ErrorHandlerService
  ) { }

  create(params: Company): Observable<Company> {
    return this.http.post<Company>(`${environment.apiUrl}/company`, params, this.httpOptions).pipe(
        // Send error to ErrorHandler service
      catchError(this.errorHandlerService.handleError<Company>('create', null))
    );
  }
}
