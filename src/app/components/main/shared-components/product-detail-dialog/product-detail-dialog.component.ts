import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Logger } from '@classes/logger.class';
import { ProductService } from '@core/services';
import { PColumn } from '@enums/.';
import { ModeText } from '@interfaces/mode.interface';
import { ProductDetailData } from '.';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.scss']
})
export class ProductDetailDialogComponent implements OnInit {

  get ModeText() { return ModeText; }
  get PColumn() { return PColumn; }

  private logger = new Logger('Product-Detail-Dialog');

  ui = {
    getCategories: false
  }

  form;

  constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDetailData,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.logger.table(`data = `, this.data);

    this.form = this.fb.group({
      [PColumn.product_category_id]: new FormControl(''),
      [PColumn.label]: new FormControl(''),
      [PColumn.value]: new FormControl(0),
    });

    this.getCategories();
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  getCategories() {
    this.ui.getCategories = true;
    this.productService.getProductCategories().subscribe(res => {
      this.ui.getCategories = false;
      this.logger.table(`Product Categories = `, res.data);
    }, err => {
      this.ui.getCategories = false;
      this.logger.error(`Get Product Categories error = `, err);
    });
  }

}
