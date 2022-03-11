import { NgModule } from '@angular/core';
import { CoreModule } from '@src/core/core.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [
    CustomerListComponent
  ],
  imports: [
    CoreModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
