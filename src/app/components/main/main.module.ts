import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { MaterialModules } from '.';
import { MainComponent } from './components/main/main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CoreModule,
    MainRoutingModule,
    ...MaterialModules
  ]
})
export class MainModule { }
