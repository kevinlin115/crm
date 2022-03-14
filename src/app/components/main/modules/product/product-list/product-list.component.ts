import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Product, ProductCategory } from '@classes/.';
import { Logger } from '@classes/logger.class';
import { DialogService, ProductService } from '@core/services';
import { Mode } from '@interfaces/mode.interface';
import { ProductCategoryDetailData } from '@shared-components/product-category-detail-dialog/index';
import { ProductDetailData } from '@shared-components/product-detail-dialog';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private logger = new Logger('Product-List');

  productList = [] as Product[];
  categoryList = [] as ProductCategory[];

  ui = {
    loadingCategories: false
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
      label: '',
      value: 0
    }
    const dialogRef = this.dialogService.getProductDetailDialog(data);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private getCategoryList() {
    this.ui.loadingCategories = true;
    this.productService.getProductCategories().pipe(
      tap(res => {
        this.ui.loadingCategories = false;
        this.categoryList = res.data || [];
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
      type: ''
    }
    const dialogRef = this.dialogService.getProductCategoryDetailDialog(data);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  categoryDrop(event: CdkDragDrop<ProductCategory[]>) {
    moveItemInArray(this.categoryList, event.previousIndex, event.currentIndex);
  }

}
