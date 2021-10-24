import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('@feature/user/pages/user.module').then(m => m.UserModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () => import('@feature/home/pages/home.module').then(m => m.HomeModule)
  },
  {
    path: 'ad',
    canActivate: [AuthGuardService],
    loadChildren: () => import('@feature/ad/pages/ad.module').then(m => m.AdModule)
  },
  // {
  //   path: '**', // Any other path    
  //   redirectTo: 'pageNotFound'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) // Main routes
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
