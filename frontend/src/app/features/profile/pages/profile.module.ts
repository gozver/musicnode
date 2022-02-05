import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ComponentsModule } from '@shared/components/components.module';

import { UserProfileComponent } from './user-profile/user-profile.component'
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { BandProfileComponent } from './band-profile/band-profile.component';
import { EditBandProfileComponent } from './edit-band-profile/edit-band-profile.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    EditUserProfileComponent,
    BandProfileComponent,
    EditBandProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    MaterialModule,

    ProfileRoutingModule,
    ComponentsModule
  ]
})
export class ProfileModule { }
