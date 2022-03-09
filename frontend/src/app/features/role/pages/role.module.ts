import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponentsModule } from '../components/role-components.module';
import { ComponentsModule } from '@shared/components/components.module';

import { ManagerComponent } from './manager/manager.component';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  declarations: [
    ManagerComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    RoleRoutingModule,    
    RoleComponentsModule,
    ComponentsModule,

    MaterialModule,
  ]
})
export class RoleModule { }
