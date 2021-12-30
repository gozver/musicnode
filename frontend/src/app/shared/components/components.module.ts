// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material
import { MaterialModule } from '@shared/modules/material.module';

// Custom Components
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader/loader.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LoaderComponent,
    ErrorDialogComponent
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
