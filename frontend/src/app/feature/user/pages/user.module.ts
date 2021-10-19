// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// custom modules
import { UserRoutingModule } from './user-routing.module';
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
    ReactiveFormsModule,
    
    UserRoutingModule,
    UserComponentsModule,
    ComponentsModule,

    MatButtonModule,
    MatIconModule
  ]
})
export class UserModule { }
