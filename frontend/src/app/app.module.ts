// Angular
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Angular Material
import { MaterialModule } from '@shared/modules/material.module';

// App
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';

// Shared Modules
import { ComponentsModule } from '@shared/components/components.module';

// Interceptors
import { AuthInterceptorService } from '@shared/interceptors/auth-interceptor.service';
import { LoaderInterceptorService } from '@shared/interceptors/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    ComponentsModule,
    MaterialModule
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
