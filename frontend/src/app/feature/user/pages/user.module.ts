// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// custom modules
import { UserRoutingModule } from './user-routing.module';

// custom components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
