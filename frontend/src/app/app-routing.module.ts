import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './shared/guards/auth-guard.service';
import { RoleGuardService } from './shared/guards/role-guard.service';

/**
 * @loadChildren => Lazy loading feature modules: https://angular.io/guide/lazy-loading-ngmodules
 * @AuthGuardService => AuthGuard middleware: redirects to LoginComponent if the user is not logged in
 */
const routes: Routes = [{
  path: 'user',
  loadChildren: () => import('@feature/user/pages/user.module').then(m => m.UserModule)
}, {
  path: '',
  canActivate: [AuthGuardService, RoleGuardService],
  loadChildren: () => import('@feature/home/pages/home.module').then(m => m.HomeModule)
}, {
  path: 'home',
  canActivate: [AuthGuardService, RoleGuardService],
  loadChildren: () => import('@feature/home/pages/home.module').then(m => m.HomeModule)
}, {
  path: 'role',
  canActivate: [AuthGuardService],
  loadChildren: () => import('@feature/role/pages/role.module').then(m => m.RoleModule)
}, {
  path: 'ad',
  canActivate: [AuthGuardService, RoleGuardService],
  loadChildren: () => import('@feature/ad/pages/ad.module').then(m => m.AdModule)
}, {
  path: 'about',
  loadChildren: () => import('@feature/about/pages/about.module').then(m => m.AdModule)
}, {
  path: 'contact',
  loadChildren: () => import('@feature/contact/pages/contact.module').then(m => m.ContactModule)
}, {
  path: '**', // Any other path
  redirectTo: '/home'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
