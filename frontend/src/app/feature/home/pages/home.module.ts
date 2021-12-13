// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MaterialModule } from '@shared/modules/material.module';

// Custom Modules
import { HomeRoutingModule } from './home-routing.module';

// Custom Components
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HomeRoutingModule
  ],
  exports: [
    // HomeComponent
  ]
})
export class HomeModule { }
