import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@shared/modules/material.module';

import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader/loader.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { EmailDialogComponent } from './email-dialog/email-dialog.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LoaderComponent,
    ErrorDialogComponent,
    EmailDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
    MaterialModule
  ],
  exports: [
    LayoutComponent,
    LoaderComponent,
    ErrorDialogComponent
  ]
})
export class ComponentsModule { }
