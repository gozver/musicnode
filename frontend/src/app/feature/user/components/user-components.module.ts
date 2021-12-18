// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// angular material
import { MaterialModule } from '@shared/modules/material.module';

// custom components
import { LoginFormComponent } from './login-form/login-form.component';
import { SingupFormComponent } from './singup-form/singup-form.component';
import { BandFormComponent } from './band-form/band-form.component';

import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [
    LoginFormComponent,
    SingupFormComponent,
    BandFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    
    MaterialModule,
    ComponentsModule,
  ],
  exports: [
    LoginFormComponent,
    SingupFormComponent,
    BandFormComponent
  ]
})
export class UserComponentsModule { }
