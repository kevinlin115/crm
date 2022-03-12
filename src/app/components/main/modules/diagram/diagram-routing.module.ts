import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagramHomeComponent } from './diagram-home';

const routes: Routes = [
  {
    path: 'home',
    component: DiagramHomeComponent
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
export class DiagramRoutingModule { }
