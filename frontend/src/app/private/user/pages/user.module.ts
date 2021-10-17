// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// custom modules
import { UserComponentsModule } from '../components/user-components.module';
import { ComponentsModule } from '@shared/components/components.module';

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

    UserComponentsModule,
    ComponentsModule
  ]
})
export class UserModule { }
