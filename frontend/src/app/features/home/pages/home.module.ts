import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponentsModule } from '../components/home-components.module';
import { ComponentsModule } from '@shared/components/components.module';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    MaterialModule,

    HomeRoutingModule,
    HomeComponentsModule,
    ComponentsModule
  ]
})
export class HomeModule { }
