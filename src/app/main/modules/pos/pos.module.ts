import { NgModule } from '@angular/core';
import { CoreModule } from '@src/core/core.module';
import { PosHomeComponent } from './pos-home/pos-home.component';
import { PosRoutingModule } from './pos-routing.module';

@NgModule({
  declarations: [
    PosHomeComponent
  ],
  imports: [
    CoreModule,
    PosRoutingModule
  ]
})
export class PosModule { }
