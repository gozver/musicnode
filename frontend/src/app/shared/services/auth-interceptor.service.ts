// angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  /**
   * @param req 
   * @param next
   * an interceptor is a service that inspect/modify all request made from the client to the server
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
