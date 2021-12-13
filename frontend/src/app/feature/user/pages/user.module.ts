// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// angular material
import { MaterialModule } from '@shared/modules/material.module';

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
    
    MaterialModule,
    UserRoutingModule,
    UserComponentsModule,
    ComponentsModule,
  ]
})
export class UserModule { }
