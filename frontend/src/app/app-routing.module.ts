import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('@feature/home/pages/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user',
    loadChildren: () => import('@feature/user/pages/user.module').then(m => m.UserModule)
  },
  {
    path: 'ad',
    loadChildren: () => import('@feature/ad/pages/ad.module').then(m => m.AdModule)
  },
  {
    path: '**', // Any other path
    redirectTo: 'home'
  }
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
