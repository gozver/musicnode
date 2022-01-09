import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/shared/modules/material.module';

import { AboutRoutingModule } from './about-routing.module';
import { ComponentsModule } from '@shared/components/components.module';

import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    
    MaterialModule,

    AboutRoutingModule,
    ComponentsModule,
  ]
})
export class AdModule { }
