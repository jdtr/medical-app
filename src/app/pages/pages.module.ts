import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphOneComponent,
    PagesComponent
  ],
  imports: [
    SharedModule,
    PagesRoutingModule
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    GraphOneComponent,
    PagesComponent
  ]
})
export class PagesModule { }
