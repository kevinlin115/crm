import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiagramHomeComponent } from './diagram-home/diagram-home.component';
import { DiagramRoutingModule } from './diagram-routing.module';

@NgModule({
  declarations: [
    DiagramHomeComponent
  ],
  imports: [
    CommonModule,
    DiagramRoutingModule
  ]
})
export class DiagramModule { }
