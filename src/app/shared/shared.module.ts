import { NgModule } from '@angular/core';
import { NoFoundComponent } from './no-found/no-found.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    NoFoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
  ],
  exports: [
    NoFoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
  ]
})
export class SharedModule { }
