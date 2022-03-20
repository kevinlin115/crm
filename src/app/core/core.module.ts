import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MaterialModules } from '.';
import { getZhPaginatorIntl } from './mat-paginator';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ...MaterialModules
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ...MaterialModules
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getZhPaginatorIntl() }
  ]
})
export class CoreModule { }
