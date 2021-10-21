// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular material
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// custom modules
import { AdRoutingModule } from './ad-routing.module';
import { AdComponentsModule } from '../components/ad-components.module';

// custom components
import { AdListComponent } from './ad-list/ad-list.component';

@NgModule({
  declarations: [
    AdListComponent
  ],
  imports: [
    CommonModule,
    AdRoutingModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,

    AdComponentsModule,
    AdRoutingModule
  ]
})
export class AdModule { }
