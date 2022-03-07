import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Ad } from '../interfaces/ad.interface'
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${environment.apiUrl}/ad`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getAds', []))
    );
  }

  getAd(id: number): Observable<Ad> {
    return this.http.get<Ad>(`${environment.apiUrl}/ad/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getAds', []))
    );
  }

  createAd(params: Ad): Observable<any> {
    return this.http.post<Ad>(`${environment.apiUrl}/ad`, params).pipe(
      catchError(this.errorHandlerService.handleError<any>('createAd', null))
    );
  }

  updateInfo(params: Ad): Observable<Ad> {
    return this.http.patch<Ad>(`${environment.apiUrl}/ad/info`, params).pipe(
      catchError(this.errorHandlerService.handleError<any>('updateInfo', null))
    );
  }

  deleteAd(adId: number): Observable<any> {
    return this.http.delete<Ad>(`${environment.apiUrl}/ad/${adId}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('deleteAd'))
    );
  }

  updateImages(id: number, imagesList: any): Observable<any> {
    const formData = new FormData();
    
    formData.append('id', id.toString());

    for (let i = 0; i < imagesList.length; i++) {
      formData.append('files', imagesList[i], imagesList[i].name);
    }

    return this.http.patch<any>(`${environment.apiUrl}/ad`, formData).pipe(
      catchError(this.errorHandlerService.handleError<any>('updateImages', null))
    );
  }
  
  deleteImages(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/ad/img/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('deleteImages', null))
    );
  }
}
