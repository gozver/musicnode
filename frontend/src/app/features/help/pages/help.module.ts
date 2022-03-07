import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';

import { HelpRoutingModule } from './help-routing.module';
import { ComponentsModule } from '@shared/components/components.module';

import { HelpComponent } from './help/help.component';


@NgModule({
  declarations: [
    HelpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    HelpRoutingModule,
    ComponentsModule,

    MaterialModule,
  ]
})
export class HelpModule { }
