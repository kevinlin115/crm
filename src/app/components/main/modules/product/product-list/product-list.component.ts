import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Logger } from '@classes/logger.class';
import { ProductService } from '@modules/product/product.service';
import { ProductDetailComponent } from '@shared-components/product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private logger = new Logger('Product-List');

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
  }

  showAddProduct() {
    this.logger.log(`display add new product dialog`);
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '250px',
      data: { a: 1 },
    });

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
