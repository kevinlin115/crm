import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailData } from '@shared-components/product-detail-dialog';
import { ProductDetailDialogComponent } from '@src/app/components/main/shared-components';

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

}
