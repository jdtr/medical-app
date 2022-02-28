import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';

const pagesRoutes: Routes = [
    {
      path: '',
      component: PagesComponent,
      canActivate: [AuthGuard],
      children: [
          { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
          { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
          { path: 'graphic-one', component: GraphOneComponent, data: { title: 'Graphics' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account settings' } },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
      ]
    }
  ];

  export const PagesRoutingModule =  RouterModule.forChild(pagesRoutes);