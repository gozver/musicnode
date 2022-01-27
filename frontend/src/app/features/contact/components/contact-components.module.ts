import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/modules/material.module';
import { ComponentsModule } from '@shared/components/components.module';

import { EmailDialogComponent } from './email-dialog/email-dialog.component';

@NgModule({
  declarations: [
    EmailDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    MaterialModule,
    ComponentsModule,
  ], 
  exports: [
    EmailDialogComponent
  ]
})
export class ContactComponentsModule { }
