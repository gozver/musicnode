import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/modules/material.module';
import { ComponentsModule } from '@shared/components/components.module';

import { HomeDialogComponent } from './home-dialog/home-dialog.component';

@NgModule({
  declarations: [
    HomeDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    MaterialModule,
    ComponentsModule
  ],
  exports: [
    HomeDialogComponent
  ]
})
export class HomeComponentsModule { }
