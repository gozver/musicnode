// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MaterialModule } from '@app/shared/modules/material.module';

// Custom Modules
import { AdRoutingModule } from './ad-routing.module';
import { AdComponentsModule } from '../components/ad-components.module';

// Custom Components
import { AdComponent } from './ad/ad.component';

@NgModule({
  declarations: [
    AdComponent
  ],
  imports: [
    CommonModule,
    AdRoutingModule,

    MaterialModule,
    
    AdComponentsModule,
    AdRoutingModule
  ]
})
export class AdModule { }
