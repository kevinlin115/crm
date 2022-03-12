import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Logger } from '@classes/logger.class';
import { ModeText } from '@interfaces/mode.interface';
import { ProductCategoryDetailData } from './index';

@Component({
  selector: 'app-product-category-detail-dialog',
  templateUrl: './product-category-detail-dialog.component.html',
  styleUrls: ['./product-category-detail-dialog.component.scss']
})
export class ProductCategoryDetailDialogComponent implements OnInit {

  get ModeText() { return ModeText; }

  private logger = new Logger('Product-Category-Detail-Dialog');

  constructor(
    public dialogRef: MatDialogRef<ProductCategoryDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCategoryDetailData,
  ) {
    this.logger.log(`data = `, this.data);
  }

  ngOnInit(): void {
  }

}
