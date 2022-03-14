import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { MainComponent } from './components/main';
import { MainRoutingModule } from './main-routing.module';
import { ProductCategoryDetailDialogComponent } from './shared-components';

@NgModule({
  declarations: [
    MainComponent,
    ProductCategoryDetailDialogComponent,
  ],
  imports: [
    CoreModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
