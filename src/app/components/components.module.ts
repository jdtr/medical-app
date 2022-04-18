import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphDoneComponent } from './graph-done/graph-done.component';
import { IncrementorComponent } from './incrementor/incrementor.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    GraphDoneComponent,
    IncrementorComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    GraphDoneComponent,
    IncrementorComponent,
    ModalImagenComponent
  ]
})
export class ComponentsModule { }
