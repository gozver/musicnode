// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// RxJS
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services, interfaces and environment variables
import { Email } from '@shared/interfaces/email.interface';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders(environment.headers)
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  sendEmail(params: Email): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/email`, params, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<Email>('create', null))
    );
  }
}
