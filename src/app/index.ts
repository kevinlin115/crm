import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { CallbackComponent } from './components/callback/callback.component';
import { LoginComponent } from './components/login/login.component';


export const MaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
] as const;

export const Components = [
  AppComponent,
  CallbackComponent,
  LoginComponent,
];
