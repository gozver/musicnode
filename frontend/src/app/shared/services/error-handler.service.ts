import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   handleError<T>(operation = 'operation', result?: T) { // T => generic type
    return (error: any): Observable<T> => {
      // Send the error to remote logging infrastructure
      console.error(`--> Code: ${error.error.err.code}`);
      console.error(`--> Error message:`);
      console.error(error.error.err.message);
      console.error(`--> Operation: ${operation}`);
      console.error(`--> Error object:`);
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of (result as T);
    };
  }
}
