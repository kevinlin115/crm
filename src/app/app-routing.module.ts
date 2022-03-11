import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { CallbackComponent } from './components/callback/callback.component';
import { LoginComponent } from './components/login/login.component';
import { GuestGuard } from './core/guards/guest.guard';

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
