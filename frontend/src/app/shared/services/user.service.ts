import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../interfaces/user.interface'
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/user`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getUsers', []))
    );
  }

  getUsersByParams(searchParams: any): Observable<User[]> {
    let httpParams = new HttpParams();

    if (searchParams) {
      for (const key in searchParams) {
        if (searchParams.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, searchParams[key]);
        }
      }
    }

    const options = { params: httpParams };

    return this.http.get<User[]>(`${environment.apiUrl}/userByParams`, options).pipe(
      catchError(this.errorHandlerService.handleError<any>('getUsersByParams', []))
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  updateAvatar(id: number, avatar: File): Observable<string> {
    const formData = new FormData();

    formData.append('id', id.toString());
    formData.append('file', avatar, avatar.name);

    return this.http.patch<any>(`${environment.apiUrl}/user`, formData).pipe(
      catchError(this.errorHandlerService.handleError<any>('updateAvatar', null))
    );
  }
}