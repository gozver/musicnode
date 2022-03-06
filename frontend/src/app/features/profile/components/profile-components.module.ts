import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComponentsModule } from '@shared/components/components.module';

import { CarouselComponent } from './carousel/carousel.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    CarouselComponent,
    UserFormComponent
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
    CarouselComponent,
    UserFormComponent
  ]
})
export class ProfileComponentsModule { }
