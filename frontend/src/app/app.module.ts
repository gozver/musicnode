// angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// angular app
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

// custom components
import { HomeComponent } from './features/components/home/home.component';

// custom Modules
import { UserModule } from '@features/components/user/user.module';
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,

    UserModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
