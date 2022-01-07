// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MaterialModule } from '@shared/modules/material.module';

// Custom Modules and Components
import { RoleRoutingModule } from './role-routing.module';
import { RoleComponentsModule } from '../components/role-components.module';
import { ComponentsModule } from '@shared/components/components.module';

// Custom Components
import { ManagerComponent } from './manager/manager.component';

@NgModule({
  declarations: [
    ManagerComponent
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
