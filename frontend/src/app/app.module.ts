// angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// angular app
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

// custom components
import { HomeComponent } from '@private/home/home.component';

// custom Modules
import { UserComponentsModule } from '@private/user/components/user-components.module';
import { ComponentsModule } from '@shared/components/components.module';
import { LoginComponent } from './private/user/pages/login/login.component';
import { SignupComponent } from './private/user/pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent, LoginComponent, SignupComponent,    
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

    UserComponentsModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
