import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { BandProfileComponent } from './band-profile/band-profile.component';
import { CompProfileComponent } from './comp-profile/comp-profile.component';

import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { EditBandProfileComponent } from './edit-band-profile/edit-band-profile.component';
import { EditCompProfileComponent } from './edit-comp-profile/edit-comp-profile.component';

const routes: Routes = [{
  path: '', // Empty because the path is defined by the parent
  children: [{ 
    path: 'user/:id',
    component: UserProfileComponent
  }, {
    path: 'band/:id',
    component: BandProfileComponent
  }, {
    path: 'company/:id',
    component: CompProfileComponent
  }, { 
    path: 'user/:id/edit',
    component: EditUserProfileComponent
  }, {
    path: 'band/:id/edit',
    component: EditBandProfileComponent
  }, {
    path: 'company/:id/edit',
    component: EditCompProfileComponent
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
