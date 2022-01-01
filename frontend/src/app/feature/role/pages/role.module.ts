// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MaterialModule } from '@shared/modules/material.module';

// Custom Modules and Components
import { RoleRoutingModule } from './role-routing.module';
import { ManagerComponent } from './manager/manager.component';


@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RoleRoutingModule
  ]
})
export class RoleModule { }
