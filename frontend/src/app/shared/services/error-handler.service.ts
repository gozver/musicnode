import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  // T => generic type
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {      
      console.log('Operation:', operation);      
      console.log('Error message:', error.message);

      return of(result as T); // return an observable of the result
    }
  }
}
