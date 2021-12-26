// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MaterialModule } from '@app/shared/modules/material.module';

// Custom
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,

    MaterialModule
  ]
})
export class ContactModule { }
