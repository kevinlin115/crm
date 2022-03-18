import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  get Mode() { return Mode; }
  get ModeText() { return ModeText; }
  get PCColumn() { return PCColumn; }

  private logger = new Logger('Product-Category-Detail-Dialog');
  form;

  private categoryList = [] as ProductCategory[];

  ui = {
    loadingCategories: false,
    gotCategories: false,
    formChanged: false,
    deleting: false,
    submitting: false
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductCategoryDetailData,
    public dialogRef: MatDialogRef<ProductCategoryDetailDialogComponent, boolean>,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.logger.table(`data = `, this.data);

    this.form = this.fb.group({
      [PCColumn.type]: new FormControl('', [Validators.required, this.typeValidator()])
    });

    if (this.data.mode === Mode.Edit) {
      this.form.patchValue({
        type: this.data.productCategory?.type
      });
    }

    this.form.valueChanges.subscribe(() => {
      this.logger.log(`form changed`);
      this.ui.formChanged = true;
    })

    this.getCategories();
  }

  ngOnInit(): void {
  }

  /** 刪除產品類別 */
  delete() {
    if (this.ui.submitting) { return; }
    this.ui.deleting = true;
    this.productService.deleteProductCategoriey(this.data.productCategory).subscribe(res => {
      this.ui.deleting = false;
      this.dialogRef.close(true);
      this.logger.log(`Delete Product Category res = `, res);
    }, err => {
      this.ui.deleting = false;
      this.logger.error(`Delete Product Category error = `, err);
    });
  }

  /** 確認 新增/更新產品類別 */
  onSubmit() {
    if (this.ui.submitting) { return; }
    this.ui.submitting = true;
    this.data.productCategory[PCColumn.type] = this.form.value[PCColumn.type];
    if (this.data.mode === Mode.Add) {
      this.data.productCategory[PCColumn.order] = this.categoryList.length;
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
      this.categoryList = res.body || [];
    }, (err) => {
      this.ui.loadingCategories = false;
      this.logger.error(`Get all product Categories err = `, err);
    })
  }

  /** Get Confirm Api */
  private confirmApi() {
    const api = this.data.mode === Mode.Add ?
      this.productService.addProductCategoriey(this.data.productCategory) :
      this.productService.updateProductCategoriey(this.data.productCategory);
    return api.pipe(
      tap(() => {
        this.ui.submitting = false;
        this.productService.$productCategoryUpdate.next(true);
        this.dialogRef.close(true);
      }),
      catchError((err) => {
        this.logger.error(`confirm api error = `, err);
        this.ui.submitting = false;
        throw (err);
      })
    )
  }

  /** 產品類別名稱 Validator */
  private typeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let existingTypes = this.categoryList.map(item => item[PCColumn.type]);
      if (this.data.mode === Mode.Edit) {
        existingTypes = existingTypes.filter(type => type !== this.data.productCategory.type)
      }
      return existingTypes.indexOf(control.value) >= 0 ? { TypeExisted: control.value } : null;
    };
  }

}
