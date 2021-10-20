import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '../interfaces/user.interface'
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root' // so we don't have to import it in the module
})
export class AuthService {

  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  signup(params: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, params, this.httpOptions)
      .pipe(
        first(), // only emit the first value
        catchError(this.errorHandlerService.handleError<any>('signup', 'no response for this error'))
      );
  }
}
