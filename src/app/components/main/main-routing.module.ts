import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'customer',
        loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'diagram',
        loadChildren: () => import('./modules/diagram/diagram.module').then(m => m.DiagramModule)
      },
      {
        path: 'pos',
        loadChildren: () => import('./modules/pos/pos.module').then(m => m.PosModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
      },
      {
        path: '**',
        redirectTo: 'customer'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
