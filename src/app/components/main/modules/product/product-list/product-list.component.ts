import { Component, OnInit } from '@angular/core';
import { Logger } from '@classes/logger.class';
import { DialogService, ProductService } from '@core/services';
import { Mode } from '@interfaces/mode.interface';
import { ProductCategoryDetailData } from '@shared-components/product-category-detail-dialog/index';
import { ProductDetailData } from '@shared-components/product-detail-dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private logger = new Logger('Product-List');

  constructor(
    private dialogService: DialogService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
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

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.logger.log(res)
    }, err => {
      this.logger.error(err)
    })
  }

  addProduct() {
    this.productService.addProduct().subscribe(res => {
      this.logger.log(res)
    }, err => {
      this.logger.error(err)
    })
  }

  updateProduct() {
    this.productService.updateProduct().subscribe(res => {
      this.logger.log(res)
    }, err => {
      this.logger.error(err)
    })
  }

  deleteProduct() {
    this.productService.deleteProduct().subscribe(res => {
      this.logger.log(res)
    }, err => {
      this.logger.error(err)
    })
  }

}
