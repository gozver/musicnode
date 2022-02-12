import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Review } from '../interfaces/reviwe.interface';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(
    private http: HttpClient,    
    private errorHandlerService: ErrorHandlerService
  ) { }

  // any: in this controller review model includes user model
  getReviews(bandId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/review/${bandId}`).pipe(
      catchError(this.errorHandlerService.handleError<any>('getReviews', []))
    );
  }

  createReview(params: Review): Observable<Review> {
    console.log(params);
    return this.http.post<Review>(`${environment.apiUrl}/review`, params).pipe(
      catchError(this.errorHandlerService.handleError<any>('createReview', null))
    );
  }
}
