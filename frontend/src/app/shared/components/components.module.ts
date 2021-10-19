// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// custom components
import { LayoutComponent } from './layout/layout.component';
import { LoadingComponent } from './loading/loading.component';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    LayoutComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    LayoutComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
