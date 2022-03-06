import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/modules/material.module';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponentsModule } from '../components/contact-components.module';
import { ComponentsModule } from '@shared/components/components.module';

import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    MaterialModule,

    ContactRoutingModule,
    ContactComponentsModule,
    ComponentsModule
  ]
})
export class ContactModule { }
