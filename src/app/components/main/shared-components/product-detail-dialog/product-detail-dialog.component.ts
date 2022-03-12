import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Logger } from '@classes/logger.class';
import { ModeText } from '@interfaces/mode.interface';
import { ProductDetailData } from '.';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.scss']
})
export class ProductDetailDialogComponent implements OnInit {

  get ModeText() { return ModeText; }

  private logger = new Logger('Product-Detail-Dialog');

  constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDetailData,
  ) {
    this.logger.log(`data = `, this.data);
  }

  ngOnInit(): void {
  }

}
