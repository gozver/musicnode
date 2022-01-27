import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Email } from '@shared/interfaces/email.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders(environment.headers)
  };

  constructor(
    private http: HttpClient
  ) { }

  sendEmail(params: Email): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/email`, params, this.httpOptions);
  }
}
