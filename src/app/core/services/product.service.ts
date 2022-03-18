import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '@classes/.';
import { PCColumn, SColumn, Table, PColumn } from '@enums/.';
import { from } from 'rxjs';
import { AuthService } from '.';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  get supabase() { return this.authService.supabase; }

  constructor(
    private authService: AuthService,
  ) { }

  getProducts() {
    return from(this.supabase
      .from(Table.Product)
      .select('*'));
  }

  addProduct(product: Product) {
    return from(this.supabase
      .from(Table.Product)
      .insert([
        {
          [PColumn.product_category_id]: product[PColumn.product_category_id],
          [PColumn.label]: product[PColumn.label],
          [PColumn.value]: product[PColumn.value],
        },
      ]));
  }

  updateProduct(product: Product) {
    return from(this.supabase
      .from(Table.Product)
      .update(
        {
          [PColumn.product_category_id]: product[PColumn.product_category_id],
          [PColumn.label]: product[PColumn.label],
          [PColumn.value]: product[PColumn.value],
        })
      .eq(SColumn.id, product[SColumn.id]))
  }

  deleteProduct(product: Product) {
    return from(this.supabase
      .from(Table.Product)
      .delete()
      .eq(SColumn.id, product[SColumn.id]))
  }

  getProductCategories() {
    return from(this.supabase
      .from(Table.ProductCategory)
      .select('*')
      .order(
        PCColumn.order,
        {
          ascending: true
        }
      ));
  }

  addProductCategoriey(productCategory: ProductCategory) {
    return from(this.supabase
      .from(Table.ProductCategory)
      .insert([
        {
          [PCColumn.type]: productCategory[PCColumn.type],
          [PCColumn.order]: productCategory[PCColumn.order],
        },
      ]));
  }

  updateProductCategoriey(productCategory: ProductCategory) {
    return from(this.supabase
      .from(Table.ProductCategory)
      .update(
        {
          [PCColumn.type]: productCategory[PCColumn.type],
          [PCColumn.order]: productCategory[PCColumn.order],
        })
      .eq(SColumn.id, productCategory[SColumn.id]))
  }

  deleteProductCategoriey(productCategory: ProductCategory) {
    return from(this.supabase
      .from(Table.ProductCategory)
      .delete()
      .eq(SColumn.id, productCategory[SColumn.id]))
  }

}
