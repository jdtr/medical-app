import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const pagesRoutes: Routes = [
    {
      path: '',
      component: PagesComponent,
      children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'graphic-one', component: GraphOneComponent },
          { path: 'account-settings', component: AccountSettingsComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
      ]
    }
  ];

  export const PagesRoutingModule =  RouterModule.forChild(pagesRoutes);