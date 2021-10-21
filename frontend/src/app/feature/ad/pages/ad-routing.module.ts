// angular modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// custom components
import { AdListComponent } from './ad-list/ad-list.component';

const routes: Routes = [
  {
    path: '', // empty path because the path is defined by the parent
    children: [
      { 
        path: '',
        component: AdListComponent
      },
      {
        path: '**', // Any other path
        redirectTo: 'login' 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Children or secundaries routes
  exports: [RouterModule]
})
export class AdRoutingModule { }
