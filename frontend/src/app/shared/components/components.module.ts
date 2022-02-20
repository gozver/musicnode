import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@shared/modules/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader/loader.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { EmailDialogComponent } from './email-dialog/email-dialog.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LoaderComponent,
    CarouselComponent,
    ErrorDialogComponent,
    EmailDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
    MaterialModule,
    CarouselModule,
  ],
  exports: [
    LayoutComponent,
    LoaderComponent,
    CarouselComponent,
    ErrorDialogComponent,
    EmailDialogComponent
  ]
})
export class ComponentsModule { }
