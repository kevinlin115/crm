import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { MaterialModules } from '.';
import { MainComponent } from './components/main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { ProductCategoryDetailDialogComponent } from './shared-components/product-category-detail-dialog/product-category-detail-dialog.component';

@NgModule({
  declarations: [
    MainComponent,
    ProductCategoryDetailDialogComponent,
  ],
  imports: [
    CoreModule,
    MainRoutingModule,
    ...MaterialModules
  ]
})
export class MainModule { }
