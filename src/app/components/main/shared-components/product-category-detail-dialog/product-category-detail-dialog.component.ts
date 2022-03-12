import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Logger } from '@classes/logger.class';
import { ProductService } from '@core/services';
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
  form;

  ui = {
    loadingCategories: false,
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductCategoryDetailData,
    public dialogRef: MatDialogRef<ProductCategoryDetailDialogComponent>,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.logger.log(`data = `, this.data);

    this.form = this.fb.group({
      type: new FormControl('', [Validators.required])
    });

    this.getCategories();
  }

  ngOnInit(): void {
  }

  /** 確認 新增/更新產品類別 */
  confirm() {

  }

  /** Get Categories for validtor */
  private getCategories() {
    this.ui.loadingCategories = true;
    this.productService.getProductCategories().subscribe((res) => {
      this.ui.loadingCategories = false;
      this.logger.log(`Get all product Categories res = `, res);
    }, (err) => {
      this.ui.loadingCategories = false;
      this.logger.error(`Get all product Categories err = `, err);
    })
  }

}
