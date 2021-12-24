// Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

// RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  /**
   * @param req 
   * @param next
   * @description An interceptor is a service that inspect/modify all requests made from the client to the server
   */
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // get the token from localstorage
    const token = localStorage.getItem('token');
    
    // if there is a token, adds to the request an ‘Authorization’ header with the token
    let clonedReq = req;

    if (token) {
      clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // return the request to the next operation
    return next.handle(clonedReq);
  }
}
