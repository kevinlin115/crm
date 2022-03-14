import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CoreModule,
    ProductRoutingModule,
  ]
})
export class ProductModule { }
