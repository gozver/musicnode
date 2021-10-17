// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// custom components
import { LoginFormComponent } from './login-form/login-form.component';
import { SingupFormComponent } from './singup-form/singup-form.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    SingupFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoginFormComponent,
    SingupFormComponent
  ]
})
export class UserComponentsModule { }
