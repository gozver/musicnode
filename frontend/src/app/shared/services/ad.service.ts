// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// RxJS
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services, interfaces and environment variables
import { Ad } from '../interfaces/ad.interface'
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
    return this.http.get<Ad[]>(`${environment.apiUrl}/ad`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>('getAds', []))
    );
  }

  getAd(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/ad/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getAds', []))
    );
  }

  createAd(params: Ad): Observable<Ad> {
    return this.http.post<Ad>(`${environment.apiUrl}/ad`, params, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>('createAd', null))
    );
  }

  // When Sequelize => Observable<number> 
  deleteAd(adId: number): Observable<unknown> {
    return this.http.delete<any>(`${environment.apiUrl}/ad/${adId}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>('deleteAd'))
    );
  }
}
