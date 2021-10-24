// angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

// angular app
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';

// shared modules
import { ComponentsModule } from '@shared/components/components.module';

// custom services
import { AuthInterceptorService } from '@shared/services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ComponentsModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true 
    // multi: true => allow multiple providers spread across many files
    // to provide configuration information to a common token
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
