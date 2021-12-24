// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material
import { MaterialModule } from '@shared/modules/material.module';

// Custom Components
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    SidebarComponent,
    LayoutComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MaterialModule
  ],
  exports: [
    SidebarComponent,
    LayoutComponent,
    LoaderComponent
  ]
})
export class ComponentsModule { }
