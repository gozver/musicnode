// Angular
import { Injectable } from '@angular/core';

// RxJS
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {  
  loading$ = new BehaviorSubject<boolean>(false);

  show(): void {
    this.loading$.next(true);
  }

  hide(): void {
    this.loading$.next(false);
  }
}
