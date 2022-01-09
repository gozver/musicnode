// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MaterialModule } from '@shared/modules/material.module';

// Custom Components
import { BandFormComponent } from './band-form/band-form.component';
import { CompanyFormComponent } from './company-form/company-form.component';

// Custom Modules
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [
    BandFormComponent,
    CompanyFormComponent
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
    CompanyFormComponent
  ]
})
export class RoleComponentsModule { }