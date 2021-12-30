// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MaterialModule } from '@app/shared/modules/material.module';

// Custom Components
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
    MaterialModule
  ], 
  exports: [
    AdCardComponent,
    AdDialogComponent
  ]
})
export class AdComponentsModule { }
