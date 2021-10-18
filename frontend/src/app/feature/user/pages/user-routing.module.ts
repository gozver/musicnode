import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '', // empty path because the path is defined by the parent
    children: [
      { 
        path: 'login',
        component: LoginComponent
      },
      { 
        path: 'signup',
        component: SignupComponent
      },
      {
        path: '**', // Any other path
        redirectTo: 'login' 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Children or secundary routes
  exports: [RouterModule]
})
export class UserRoutingModule { }
