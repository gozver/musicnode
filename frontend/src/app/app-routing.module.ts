import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './shared/guards/auth.guard';
import { RoleGuardService } from './shared/guards/role.guard';

/**
 * @loadChildren => Lazy loading feature modules: https://angular.io/guide/lazy-loading-ngmodules
 * @AuthGuardService => AuthGuard middleware: redirects to LoginComponent if the user is not logged in
 */
const routes: Routes = [{
  path: 'user',
  loadChildren: () => import('@features/user/pages/user.module').then(m => m.UserModule)
}, {
  path: '',
  canActivate: [AuthGuardService, RoleGuardService],
  loadChildren: () => import('@features/home/pages/home.module').then(m => m.HomeModule)
}, {
  path: 'home',
  canActivate: [AuthGuardService, RoleGuardService],
  loadChildren: () => import('@features/home/pages/home.module').then(m => m.HomeModule)
}, {
  path: 'profile',
  canActivate: [AuthGuardService, RoleGuardService],
  loadChildren: () => import('@features/profile/pages/profile.module').then(m => m.ProfileModule)
}, {
  path: 'ad',
  canActivate: [AuthGuardService, RoleGuardService],
  loadChildren: () => import('@features/ad/pages/ad.module').then(m => m.AdModule)
}, {
  path: 'chat',
  canActivate: [AuthGuardService, RoleGuardService],
  loadChildren: () => import('@features/chat/pages/chat.module').then(m => m.MessageModule)
}, {
  path: 'role',
  canActivate: [AuthGuardService],
  loadChildren: () => import('@features/role/pages/role.module').then(m => m.RoleModule)
}, {
  path: 'explore',
  canActivate: [AuthGuardService, RoleGuardService],
  loadChildren: () => import('@features/explore/pages/explore.module').then(m => m.ExploreModule)
}, {
  path: 'about',
  loadChildren: () => import('@features/about/pages/about.module').then(m => m.AdModule)
}, {
  path: 'contact',
  loadChildren: () => import('@features/contact/pages/contact.module').then(m => m.ContactModule)
}, {
  path: '**', // Any other path
  redirectTo: '/home'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
