import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';

const routes: Routes = [{
  path: '', // empty path because is defined by the parent
  children: [{ 
    path: '',
    component: AboutComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Children or secundaries routes
  exports: [RouterModule]
})
export class AboutRoutingModule { }
