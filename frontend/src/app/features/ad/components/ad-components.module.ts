import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';
import { ComponentsModule } from '@shared/components/components.module';

import { AdCardComponent } from './ad-card/ad-card.component';
import { AdDialogComponent } from './ad-dialog/ad-dialog.component';

@NgModule({
  declarations: [
    AdCardComponent,
    AdDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    MaterialModule,
    ComponentsModule
  ], 
  exports: [
    AdCardComponent,
    AdDialogComponent
  ]
})
export class AdComponentsModule { }
