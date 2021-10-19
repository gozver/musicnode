// angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular app
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';

// shared modules
import { ComponentsModule } from './shared/components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    ComponentsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
