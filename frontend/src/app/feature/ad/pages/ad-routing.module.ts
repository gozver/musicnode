// angular modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// custom components
import { AdPortalComponent } from './ad-portal/ad-portal.component';

const routes: Routes = [
  {
    path: '', // empty path because the path is defined by the parent
    children: [
      { 
        path: '',
        component: AdPortalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Children or secundaries routes
  exports: [RouterModule]
})
export class AdRoutingModule { }
