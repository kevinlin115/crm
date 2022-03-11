import { NgModule } from '@angular/core';
import { CoreModule } from '@src/core/core.module';
import { DiagramHomeComponent } from './diagram-home/diagram-home.component';
import { DiagramRoutingModule } from './diagram-routing.module';

@NgModule({
  declarations: [
    DiagramHomeComponent
  ],
  imports: [
    CoreModule,
    DiagramRoutingModule
  ]
})
export class DiagramModule { }
