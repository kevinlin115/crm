import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosHomeComponent } from './pos-home';

const routes: Routes = [
  {
    path: 'home',
    component: PosHomeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
