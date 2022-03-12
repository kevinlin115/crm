import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailData, ProductDetailDialogComponent } from '@main/shared-components/product-detail-dialog';
import { ProductCategoryDetailData } from './../../components/main/shared-components/product-category-detail-dialog/index';
import { ProductCategoryDetailDialogComponent } from './../../components/main/shared-components/product-category-detail-dialog/product-category-detail-dialog.component';

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
