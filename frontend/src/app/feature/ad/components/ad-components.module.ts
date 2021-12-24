// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// angular material
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// custom components
import { AdCreateComponent } from './ad-create/ad-create.component';
import { AdFormComponent } from './ad-form/ad-form.component';
import { AdCardComponent } from './ad-card/ad-card.component';

@NgModule({
  declarations: [
    AdFormComponent,
    AdCreateComponent,
    AdCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ], 
  exports: [
    AdFormComponent,
    AdCreateComponent,
    AdCardComponent
  ]
})
export class AdComponentsModule { }
