import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComponentsModule } from '@shared/components/components.module';

import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    
    MaterialModule,
    CarouselModule,
    ComponentsModule,
  ],
  exports: [
    CarouselComponent
  ]
})
export class ProfileComponentsModule { }
