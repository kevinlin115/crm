import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategory } from '@classes/.';
import { Logger } from '@classes/logger.class';
import { DialogService, ProductService, SnackService } from '@core/services/.';
import { PCColumn, PColumn, SColumn } from '@enums/.';
import { Mode, ModeText } from '@interfaces/mode.interface';
import { catchError, tap } from 'rxjs';
import { ProductDetailData } from '.';
import { ProductCategoryDetailData } from '../product-category-detail-dialog';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.scss']
})
export class ProductDetailDialogComponent implements OnInit {

  get ModeText() { return ModeText; }
  get PColumn() { return PColumn; }
  get PCColumn() { return PCColumn; }
  get SColumn() { return SColumn; }

  private logger = new Logger('Product-Detail-Dialog');

  form;
  categoryList = [] as ProductCategory[];

  ui = {
    getCategories: false,
    submitting: false,
  };

  constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent, boolean>,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: ProductDetailData,
    private fb: FormBuilder,
    private productService: ProductService,
    private snackService: SnackService
  ) {
    this.logger.table(`data = `, this.data);

    this.form = this.fb.group({
      [PColumn.product_category_id]: new FormControl(null, [Validators.required]),
      [PColumn.label]: new FormControl('', [Validators.required]),
      [PColumn.value]: new FormControl('', [Validators.required]),
    });

    this.getCategories();
  }

  ngOnInit(): void {
  }

  addProductCategory() {
    const data: ProductCategoryDetailData = {
      mode: Mode.Add,
      productCategory: new ProductCategory()
    }
    const dialogRef = this.dialogService.getProductCategoryDetailDialog(data);

    dialogRef.afterClosed().subscribe((refresh: boolean) => {
      if (refresh) {
        this.logger.log(`Refresh = `, refresh);
        this.form.patchValue({
          [PColumn.product_category_id]: null
        });
        this.getCategories();
      }
    });
  }

  onSubmit() {
    this.logger.table('Form Value = ', this.form.value);

    this.productService.addProduct(this.data.product)
    if (this.ui.submitting) { return; }
    this.ui.submitting = true;
    Object.assign(this.data.product, this.form.value);
    this.confirmApi().subscribe();
  }

  private getCategories() {
    this.ui.getCategories = true;
    this.productService.getProductCategories().subscribe(res => {
      this.ui.getCategories = false;
      this.logger.table(`Product Categories = `, res.data);
      this.categoryList = res.data || [];
      if (this.categoryList.length === 0) {
        this.snackService.openSnackBar('尚未新增任何產品類別', 'OK');
      }
    }, err => {
      this.ui.getCategories = false;
      this.logger.error(`Get Product Categories error = `, err);
    });
  }

  private confirmApi() {
    const api = this.data.mode === Mode.Add ?
      this.productService.addProduct(this.data.product) :
      this.productService.updateProduct(this.data.product);
    return api.pipe(
      tap(() => {
        this.ui.submitting = false;
        this.dialogRef.close(true);
      }),
      catchError((err) => {
        this.logger.error(`confirm api error = `, err);
        this.ui.submitting = false;
        throw (err);
      })
    )
  }

}
