import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';

import { ExploreRoutingModule } from './explore-routing.module';
import { ComponentsModule } from '@shared/components/components.module';

import { ExploreComponent } from './explore/explore.component'

@NgModule({
  declarations: [
    ExploreComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    MaterialModule,

    ExploreRoutingModule,
    ComponentsModule
  ]
})
export class ExploreModule { }
