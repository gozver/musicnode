// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

// custom
import { Ad } from '../interfaces/ad.interface'
import { User } from '../interfaces/user.interface'
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders(environment.headers)
  };

  constructor(
    private http: HttpClient,    
    private errorHandlerService: ErrorHandlerService
  ) { }

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${environment.apiUrl}/ad`, { responseType: 'json'}).pipe(
      catchError(this.errorHandlerService.handleError<Ad[]>('getAds', []))
      // NOTE: ('getAds', []) => return an empty observabe of type Ad and an empty array
    );
  }

  createAd(adForm: Partial<Ad>, userId: Pick<User, 'id'>): Observable<Ad> {
    const data = {
      userId: userId,
      title: adForm.title,
      description: adForm.description
    };

    return this.http.post<Ad>(`${environment.apiUrl}/ad`, data, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<Ad>('createAd'))
    );
  }

  deleteAd(adId: Pick<Ad, 'id'>): Observable<{}> {
    return this.http.delete<Ad>(`${environment.apiUrl}/${adId}`, this.httpOptions).pipe(
      first(), // to make sure that only happens the 1st occurrence so we don't have to unsubscribe
      catchError(this.errorHandlerService.handleError<Ad>('deleteAd'))
    );
  }
}
