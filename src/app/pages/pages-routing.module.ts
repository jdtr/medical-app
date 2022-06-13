import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
// Maintenance
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const newLocal = 'My Profile';
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
          { path: 'my-profile', component: ProfileComponent, data: { title: newLocal } },
          { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' }},
          { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' }},
          { path: 'doctors/:id', component: DoctorComponent, data: { title: 'Doctor' }},
          { path: 'search/:term', component: SearchComponent, data: { title: 'Search' }},
          { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Users' }},
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      ]
    }
  ];

  export const PagesRoutingModule = RouterModule.forChild(pagesRoutes);