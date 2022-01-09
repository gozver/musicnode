import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponentsModule } from '../components/profile-components.module';
import { ComponentsModule } from '@shared/components/components.module';

import { ProfileComponent } from './profile/profile.component'
import { UpdateProfileComponent } from './update-profile/update-profile.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    MaterialModule,

    ProfileRoutingModule,
    ProfileComponentsModule,
    ComponentsModule
  ]
})
export class ProfileModule { }
