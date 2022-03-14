import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

export const MaterialModules = [
  DragDropModule,
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTabsModule,
] as const;
