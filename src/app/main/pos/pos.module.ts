import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PosHomeComponent } from './pos-home/pos-home.component';
import { PosRoutingModule } from './pos-routing.module';

@NgModule({
  declarations: [
    PosHomeComponent
  ],
  imports: [
    CommonModule,
    PosRoutingModule
  ]
})
export class PosModule { }
