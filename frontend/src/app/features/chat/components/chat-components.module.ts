import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MaterialModule } from '@shared/modules/material.module';

// Custom Modules
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    
    MaterialModule,
    ComponentsModule,
  ],
  exports: []
})
export class ChatComponentsModule { }
