import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [{
  path: '', // Empty because the path is defined by the parent
  children: [{ 
    path: ':id',
    component: ProfileComponent
  }, { 
    path: ':id/edit',
    component: UpdateProfileComponent
  }, {
    path: '**', // Any other path
    redirectTo: '/home'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Children or secundaries routes
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
