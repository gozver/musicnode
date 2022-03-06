import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';
import { ComponentsModule } from '@shared/components/components.module';

import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
  declarations: [
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    
    MaterialModule,
    ComponentsModule
  ],
  exports: [
    SearchFormComponent
  ]
})
export class ExploreComponentsModule { }
