import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';
import { ComponentsModule } from '@shared/components/components.module';

import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    MaterialModule,
    ComponentsModule
  ],
  exports: [
    ContactFormComponent
  ]
})
export class ContactComponentsModule { }
