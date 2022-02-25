import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListAdComponent } from './list-ad/list-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';

const routes: Routes = [{
  path: '', // empty path because is defined by the parent
  children: [{ 
    path: '',
    component: ListAdComponent
  }, {
    path: 'edit',
    component: EditAdComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Children or secundaries routes
  exports: [RouterModule]
})
export class AdRoutingModule { }
