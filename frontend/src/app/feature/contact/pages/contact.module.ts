// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MaterialModule } from '@app/shared/modules/material.module';

// Custom Modules
import { ContactRoutingModule } from './contact-routing.module';
import { ComponentsModule } from '@shared/components/components.module';

// Custom Components
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ContactRoutingModule,
    ComponentsModule,

    MaterialModule
  ]
})
export class ContactModule { }
