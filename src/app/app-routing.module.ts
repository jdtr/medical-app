import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoFoundComponent } from './shared/no-found/no-found.component';
import { AuthModule } from './auth/auth.module';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', component: NoFoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true })
