import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '', // Empty path because is defined by the parent
  children: [{ 
    path: '',
    component: HomeComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Children or secundaries routes
  exports: [RouterModule]
})
export class HomeRoutingModule { }
