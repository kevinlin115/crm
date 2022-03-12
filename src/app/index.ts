import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { CallbackComponent } from './components/callback';
import { LoginComponent } from './components/login';


export const MaterialModules = [
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatProgressSpinnerModule,
] as const;

export const Components = [
  AppComponent,
  CallbackComponent,
  LoginComponent,
];
