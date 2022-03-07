import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';

import { BandFormComponent } from './band-form/band-form.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [
    BandFormComponent,
    CompanyFormComponent,
    RoleFormComponent,
    RolesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    
    MaterialModule,
    ComponentsModule,
  ],
  exports: [
    BandFormComponent,
    CompanyFormComponent,
    RoleFormComponent,
    RolesListComponent
  ]
})
export class RoleComponentsModule { }
