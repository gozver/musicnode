// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom Components
import { AdComponent } from './ad/ad.component';

const routes: Routes = [{
  path: '', // empty path because is defined by the parent
  children: [{ 
    path: '',
    component: AdComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Children or secundaries routes
  exports: [RouterModule]
})
export class AdRoutingModule { }
