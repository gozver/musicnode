// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// RxJS
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services, interfaces and environment variables
import { User } from '../interfaces/user.interface'
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders(environment.headers)
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/user`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>('getUsers', []))
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>('getCurrentUser', null))
    );
  }

  updateAvatar(id: number, avatar: File): Observable<string> {
    console.log('--> id:', id);
    console.log('--> avatar:', avatar);

    var formData = new FormData();
    formData.append('id', id.toString());
    formData.append('file', avatar, avatar.name);

    return this.http.post<any>(`${environment.apiUrl}/user`, formData);
    // ).pipe(
    //   catchError(this.errorHandlerService.handleError<any>('updateAvatar', null))
    // );
  }
}