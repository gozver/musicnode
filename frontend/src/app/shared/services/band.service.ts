import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Band } from '../interfaces/band.interface'
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BandService {
  constructor(
    private http: HttpClient,    
    private errorHandlerService: ErrorHandlerService
  ) { }

  createBand(band: Band, userId: number): Observable<Band> {
    return this.http.post<Band>(`${environment.apiUrl}/band`, { band, userId }).pipe(
      catchError(this.errorHandlerService.handleError<any>('createBand', null))
    );
  }

  getBands(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/band`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getBands', []))
    );
  }

  getBandsByParams(searchParams: any): Observable<Band[]> {
    let httpParams = new HttpParams();

    if (searchParams) {
      for (const key in searchParams) {
        if (searchParams.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, searchParams[key]);
        }
      }
    }

    const options = { params: httpParams };

    return this.http.get<Band[]>(`${environment.apiUrl}/band/params`, options).pipe(
      catchError(this.errorHandlerService.handleError<any>('getBandsByParams', []))
    );
  }

  getBand(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/band/${id}`);
  }

  updateInfo(params: Band): Observable<Band> {
    return this.http.patch<Band>(`${environment.apiUrl}/band/info`, params).pipe(
      catchError(this.errorHandlerService.handleError<any>('updateInfo', null))
    );
  }

  updateAvatar(id: number, avatar: File): Observable<string> {
    const formData = new FormData();

    formData.append('id', id.toString());
    formData.append('file', avatar, avatar.name);

    return this.http.patch<any>(`${environment.apiUrl}/band`, formData).pipe(
      catchError(this.errorHandlerService.handleError<any>('updateAvatar', null))
    );
  }

  updateImages(id: number, imagesList: any): Observable<string> {
    const formData = new FormData();
    
    formData.append('id', id.toString());

    for (let i = 0; i < imagesList.length; i++) {
      formData.append('files', imagesList[i], imagesList[i].name);
    }

    return this.http.patch<any>(`${environment.apiUrl}/band/multi`, formData).pipe(
      catchError(this.errorHandlerService.handleError<any>('updateImages', null))
    );
  }

  deleteImages(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/band/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('deleteImages', null))
    );
  }
}
