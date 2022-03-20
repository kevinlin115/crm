import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { IndexColumn, OperationColumn, Product, ProductCategory } from '@classes/.';
import { Logger } from '@classes/logger.class';
import { pageSizeOptions } from '@core/mat-paginator';
import { DialogService, ProductService } from '@core/services';
import { UtilService } from '@core/services/.';
import { PCColumn, PColumn, Table } from '@enums/.';
import { Mode } from '@interfaces/mode.interface';
import { ProductCategoryDetailData } from '@shared-components/product-category-detail-dialog/index';
import { ProductDetailData } from '@shared-components/product-detail-dialog';
import * as _ from "lodash";
import { catchError, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  get IndexColumn() { return IndexColumn; }
  get OperationColumn() { return OperationColumn; }
  get pageSizeOptions() { return pageSizeOptions; }
  get PCColumn() { return PCColumn; }
  get PColumn() { return PColumn; }
  get Table() { return Table; }

  private logger = new Logger('Product-List');

  productList = [] as Product[];
  categoryList = [] as ProductCategory[];

  productPage = new PageEvent();

  @ViewChild('CategoryTable') CategoryTable!: MatTable<ProductCategory>;
  private categorySub;

  readonly productColumns = [this.IndexColumn, PCColumn.type, PColumn.label, PColumn.value, this.OperationColumn];
  readonly categoryColumns = [this.OperationColumn, PCColumn.order, PCColumn.type];

  ui = {
    // Product
    loadingProducts: false,

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
    private utilService: UtilService,
  ) {
    this.categorySub = this.productService.$productCategoryUpdate.subscribe(() => {
      this.getProductList();
      this.getCategoryList();
    });
    this.initPage();
  }

  private initPage() {
    this.productPage.length = 0;
    this.productPage.pageIndex = 0;
    this.productPage.pageSize = this.pageSizeOptions[0];
  }

  ngOnInit(): void {
    this.getProductList();
    this.getCategoryList();
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  private getProductList() {
    this.productList = [];
    this.ui.loadingProducts = true;
    const range = this.utilService.getRange(this.productPage);
    this.productService.getProducts(range).pipe(
      tap(res => {
        this.logger.log(`product list res = `, res);
        this.ui.loadingProducts = false;
        this.productList = res.data || [];
        this.productPage.length = res.count || 0;
        this.logger.table(`Product List = `, this.productList);
      }),
      catchError(err => {
        this.logger.error(`Get Product list error = `, err);
        this.ui.loadingProducts = false;
        this.productPage.length = 0;
        throw (err);
      })
    ).subscribe();
  }

  // Display Add New Product Dialog
  showAddProduct() {
    const data: ProductDetailData = {
      mode: Mode.Add,
      product: new Product()
    };
    const dialogRef = this.dialogService.getProductDetailDialog(data);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductList();
      }
    });
  }

  editProduct(index: number) {
    this.logger.table(`Edit Product`, this.productList[index]);
    const data: ProductDetailData = {
      mode: Mode.Edit,
      product: _.cloneDeep(this.productList[index])
    }
    const dialogRef = this.dialogService.getProductDetailDialog(data);

    dialogRef.afterClosed().subscribe((refresh: boolean) => {
      if (refresh) {
        this.getProductList();
      }
    });
  }

  onProductPage($event: PageEvent) {
    this.productPage = $event;
    this.logger.log(this.productPage);
    this.getProductList();
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
    this.logger.table(`Edit Category`, this.categoryList[index]);
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
