// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// custom modules
import { HomeRoutingModule } from './home-routing.module';

// custom components
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
