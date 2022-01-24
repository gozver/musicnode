import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [{
  path: '', // Empty because the path is defined by the parent
  children: [{ 
    path: ':id',
    component: UserProfileComponent
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
