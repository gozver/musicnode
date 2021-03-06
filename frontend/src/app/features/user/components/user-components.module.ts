import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';
import { ComponentsModule } from '@shared/components/components.module';

import { LoginFormComponent } from './login-form/login-form.component';
import { SingupFormComponent } from './singup-form/singup-form.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    SingupFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    
    MaterialModule,
    ComponentsModule
  ],
  exports: [
    LoginFormComponent,
    SingupFormComponent
  ]
})
export class UserComponentsModule { }
