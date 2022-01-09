// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Sockets
import * as io from 'socket.io-client';

// RxJS
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services, interfaces and environment variables
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '@environments/environment';
import { Message } from '@shared/interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: io.Socket;

  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders(environment.headers)
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { 
    this.socket = io.connect(environment.serverUrl, { transports: ["websocket"] });
  }

  // When receiving an event, send the data to the next operation
  listen(eventName: string): Observable<any> {
    return new Observable(subscriber => {
      this.socket.on(eventName, (data) => subscriber.next(data));
    });
  }

  // Emits the event with its data
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  getMessages(from: number, to: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}/message/${from}${to}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>('getMessages', []))
    );
  }

  createMessage(body: string, userId: number, recipient: number): Observable<Message>{
    return this.http.post<Message>(`${environment.apiUrl}/message`, { body, userId, recipient }, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>('createMessage', null))
    );
  }
}
