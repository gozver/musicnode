// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// angular material
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// custom components
import { LoginFormComponent } from './login-form/login-form.component';
import { SingupFormComponent } from './singup-form/singup-form.component';

import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [
    LoginFormComponent,
    SingupFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    MatInputModule,
    MatSelectModule,    
    MatIconModule,

    ComponentsModule,
  ],
  exports: [
    LoginFormComponent,
    SingupFormComponent
  ]
})
export class UserComponentsModule { }
