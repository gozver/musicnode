import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './shared/services/auth-guard.service';

/**
 * @loadChildren => Lazy loading feature modules: https://angular.io/guide/lazy-loading-ngmodules
 * @AuthGuardService => AuthGuard middleware: redirects to LoginComponent if the user is not logged in
 */
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () => import('@feature/home/pages/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () => import('@feature/home/pages/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user',
    loadChildren: () => import('@feature/user/pages/user.module').then(m => m.UserModule)
  },
  // {
  //   path: 'ad',
  //   canActivate: [AuthGuardService],
  //   loadChildren: () => import('@feature/ad/pages/ad.module').then(m => m.AdModule)
  // },
  // {
  //   path: '**', // Any other path    
  //   redirectTo: '/home'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
