import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, GuestGuard } from '@core/guards';
import { CallbackComponent } from './components/callback';
import { LoginComponent } from './components/login';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [GuestGuard],
    component: LoginComponent
  },
  {
    path: 'callback',
    canActivate: [GuestGuard],
    component: CallbackComponent
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
