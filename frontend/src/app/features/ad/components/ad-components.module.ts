import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComponentsModule } from '@shared/components/components.module';

import { AdCardComponent } from './ad-card/ad-card.component';
import { AdCarouselComponent } from './ad-carousel/ad-carousel.component';
import { AdDialogComponent } from './ad-dialog/ad-dialog.component';
import { EditAdFormComponent } from './edit-ad-form/edit-ad-form.component';

@NgModule({
  declarations: [
    AdCardComponent,
    AdCarouselComponent,
    AdDialogComponent,
    EditAdFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    MaterialModule,
    CarouselModule,
    ComponentsModule
  ], 
  exports: [
    AdCardComponent,
    AdCarouselComponent,
    AdDialogComponent,
    EditAdFormComponent
  ]
})
export class AdComponentsModule { }
