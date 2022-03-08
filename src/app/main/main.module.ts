import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModules } from '.';
import { MainComponent } from './components/main/main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ...MaterialModules
  ]
})
export class MainModule { }
