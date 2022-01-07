// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MaterialModule } from '@app/shared/modules/material.module';

// Custom Modules
import { AboutRoutingModule } from './about-routing.module';
import { ComponentsModule } from '@shared/components/components.module';

// Custom Components
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    
    AboutRoutingModule,
    ComponentsModule,

    MaterialModule
  ]
})
export class AdModule { }
