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
      catchError(this.errorHandlerService.handleError<Ad[]>('getAds', []))
    );
  }

  createAd(params: any): Observable<Ad> {
    return this.http.post<Ad>(`${environment.apiUrl}/ad`, params, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<Ad>('createAd', null))
    );
  }

  // When Sequelize => Observable<number> 
  deleteAd(adId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/ad/${adId}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<Ad>('deleteAd'))
    );
  }
}
