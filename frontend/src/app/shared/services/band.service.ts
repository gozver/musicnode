import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  // any: in this controller model band includes model user and model image
  getBands(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/band`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getBands', []))
    );
  }

  createBand(band: Band, userId: number): Observable<Band> {
    return this.http.post<Band>(`${environment.apiUrl}/band`, { band, userId }).pipe(
      catchError(this.errorHandlerService.handleError<any>('createBand', null))
    );
  }
}
