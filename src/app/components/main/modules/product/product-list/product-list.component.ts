import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Product, ProductCategory } from '@classes/.';
import { Logger } from '@classes/logger.class';
import { DialogService, ProductService } from '@core/services';
import { PCColumn, PColumn } from '@enums/.';
import { Mode } from '@interfaces/mode.interface';
import { ProductCategoryDetailData } from '@shared-components/product-category-detail-dialog/index';
import { ProductDetailData } from '@shared-components/product-detail-dialog';
import { catchError, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  get IndexColumn() { return 'IndexColumn'; }
  get ColumnOperation() { return 'ColumnOperation'; }
  get PCColumn() { return PCColumn; }

  private logger = new Logger('Product-List');

  productList = [] as Product[];
  categoryList = [] as ProductCategory[];
  @ViewChild('CategoryTable') CategoryTable!: MatTable<ProductCategory>;

  readonly productColumns = [this.IndexColumn, PColumn.label, PColumn.value, PColumn.product_category_id];
  readonly categoryColumns = [this.ColumnOperation, PCColumn.order, PCColumn.type];

  ui = {
    // Product


    // Product Category
    loadingCategories: false,
    categoryOrderModified: false,
    categoryModifyIndex: {
      min: 0,
      max: 0,
    },
    updatingCategoryOrder: false
  }

  constructor(
    private dialogService: DialogService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getProductList();
    this.getCategoryList();
  }

  private getProductList() {

  }

  // Display Add New Product Dialog
  showAddProduct() {
    const data: ProductDetailData = {
      mode: Mode.Add,
      product: new Product()
    };
    const dialogRef = this.dialogService.getProductDetailDialog(data);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private getCategoryList() {
    this.ui.loadingCategories = true;
    this.ui.categoryOrderModified = false;
    this.productService.getProductCategories().pipe(
      tap(res => {
        this.ui.loadingCategories = false;
        this.categoryList = res.data || [];
        this.ui.categoryModifyIndex.min = this.categoryList.length;
        this.ui.categoryModifyIndex.max = 0;
      }),
      catchError(err => {
        this.logger.error(`Get category list error = `, err);
        this.ui.loadingCategories = false;
        throw (err);
      })
    ).subscribe();
  }

  // Display Add New Product Category Dialog
  showAddProductCategory() {
    const data: ProductCategoryDetailData = {
      mode: Mode.Add,
      productCategory: new ProductCategory()
    }
    const dialogRef = this.dialogService.getProductCategoryDetailDialog(data);

    dialogRef.afterClosed().subscribe((refresh: boolean) => {
      if (refresh) {
        this.getCategoryList();
      }
    });
  }

  categoryDrop(event: CdkDragDrop<ProductCategory[]>) {
    moveItemInArray(this.categoryList, event.previousIndex, event.currentIndex);
    const [smallIndex, bigIndex] = event.previousIndex < event.currentIndex ?
      [event.previousIndex, event.currentIndex] :
      [event.currentIndex, event.previousIndex];
    for (let i = smallIndex; i <= bigIndex; i++) {
      this.categoryList[i][PCColumn.order] = i;
    }
    if (smallIndex < this.ui.categoryModifyIndex.min) {
      this.ui.categoryModifyIndex.min = smallIndex;
    }
    if (bigIndex > this.ui.categoryModifyIndex.max) {
      this.ui.categoryModifyIndex.max = bigIndex;
    }
    this.ui.categoryOrderModified = true;

    this.CategoryTable?.renderRows();
  }

  updateCategoryOrder() {
    this.ui.updatingCategoryOrder = true;
    const updateList = this.categoryList.filter((item, index) =>
      this.ui.categoryModifyIndex.min <= index && index <= this.ui.categoryModifyIndex.max);
    this.logger.table(`updateList`, updateList);
    forkJoin(updateList.map(item => {
      return this.productService.updateProductCategoriey(item)
    })).pipe(
      tap(() => {
        this.ui.categoryOrderModified = false;
        this.ui.updatingCategoryOrder = false;
        this.ui.categoryModifyIndex = {
          min: this.categoryList.length,
          max: 0
        };
      }),
    ).subscribe(() => { }, (err) => {
      this.logger.error(`update Product Category order error = `, err);
    });
  }

  editCategory(index: number) {
    this.logger.table(`edit category`, this.categoryList[index]);
    const data: ProductCategoryDetailData = {
      mode: Mode.Edit,
      productCategory: this.categoryList[index]
    }
    const dialogRef = this.dialogService.getProductCategoryDetailDialog(data);

    dialogRef.afterClosed().subscribe((refresh: boolean) => {
      if (refresh) {
        this.getCategoryList();
      }
    });
  }

}
