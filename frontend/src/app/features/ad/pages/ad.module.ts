import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/modules/material.module';

import { AdRoutingModule } from './ad-routing.module';
import { AdComponentsModule } from '../components/ad-components.module';
import { ComponentsModule } from '@shared/components/components.module';

import { ListAdComponent } from './list-ad/list-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';

@NgModule({
  declarations: [
    ListAdComponent,
    EditAdComponent
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
