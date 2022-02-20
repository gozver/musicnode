import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/modules/material.module';

import { AdRoutingModule } from './ad-routing.module';
import { AdComponentsModule } from '../components/ad-components.module';
import { ComponentsModule } from '@shared/components/components.module';

import { AdComponent } from './ad/ad.component';

@NgModule({
  declarations: [
    AdComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    MaterialModule,
    
    AdRoutingModule,
    AdComponentsModule,
    ComponentsModule
  ]
})
export class AdModule { }
