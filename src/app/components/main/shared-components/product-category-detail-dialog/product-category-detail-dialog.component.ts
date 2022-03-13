import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Logger } from '@classes/logger.class';
import { ProductCategory } from '@classes/product-category.class';
import { ProductService } from '@core/services';
import { PCColumn } from '@enums/product-category-column.enum';
import { Mode, ModeText } from '@interfaces/mode.interface';
import { catchError, tap } from 'rxjs';
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

  private category = new ProductCategory();
  private categories = [] as ProductCategory[];

  ui = {
    loadingCategories: false,
    gotCategories: false,
    submitting: false
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
  onSubmit() {
    if (this.ui.submitting) { return; }
    this.ui.submitting = true;
    this.category[PCColumn.type] = this.form.value[PCColumn.type];
    if (this.data.mode === Mode.Add) {
      this.category[PCColumn.order] = this.categories.length;
    }
    this.confirmApi().subscribe();
  }

  /** Get Categories for validtor */
  private getCategories() {
    this.ui.loadingCategories = true;
    this.productService.getProductCategories().subscribe((res) => {
      this.ui.loadingCategories = false;
      this.ui.gotCategories = true;
      this.logger.log(`Get all product Categories res = `, res);
      this.categories = res.body || [];
    }, (err) => {
      this.ui.loadingCategories = false;
      this.logger.error(`Get all product Categories err = `, err);
    })
  }

  /** Get Confirm Api */
  private confirmApi() {
    const api = this.data.mode === Mode.Add ?
      this.productService.addProductCategoriey(this.category) :
      this.productService.updateProductCategoriey(this.category);

    return api.pipe(
      tap(() => {
        this.ui.submitting = false;
        this.dialogRef.close();
      }),
      catchError((err) => {
        this.logger.error(`confirm api error = `, err);
        this.ui.submitting = false;
        throw (err);
      })
    )
  }

}
