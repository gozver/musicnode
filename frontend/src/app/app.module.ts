// Angular
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// App
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';

// Shared modules
import { ComponentsModule } from '@shared/components/components.module';

// Interceptors
import { AuthInterceptorService } from '@shared/services/auth-interceptor.service';
import { LoaderInterceptorService } from '@shared/services/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    ComponentsModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
