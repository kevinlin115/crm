import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ProductCategoryDetailData, ProductCategoryDetailDialogComponent,
  ProductDetailData, ProductDetailDialogComponent
} from '@main/shared-components';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private matDialog: MatDialog
  ) { }

  getProductDetailDialog(data: ProductDetailData) {
    return this.matDialog.open(ProductDetailDialogComponent, {
      width: '80vw',
      data
    });
  }

  getProductCategoryDetailDialog(data: ProductCategoryDetailData) {
    return this.matDialog.open(ProductCategoryDetailDialogComponent, {
      width: '80vw',
      data
    });
  }

}
