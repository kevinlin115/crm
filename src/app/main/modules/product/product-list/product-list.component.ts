import { Component, OnInit } from '@angular/core';
import { ProductService } from '@modules/product/product.service';
import { Logger } from '@src/classes/logger.class';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private logger = new Logger('Product-List');

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
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
