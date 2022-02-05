import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderService } from '@shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(
    private readonly loaderService: LoaderService
  ) { }

  /**
   * @param req 
   * @param next
   * @description An interceptor is a service that inspect/modify all requests made from the client to the server
   */
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
