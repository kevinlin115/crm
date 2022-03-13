import { Injectable } from '@angular/core';
import { ProductCategory } from '@classes/.';
import { PCColumn, SColumn, Table } from '@enums/.';
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
      .from('Product')
      .select('*'));
  }

  addProduct() {
    return from(this.supabase
      .from('Product')
      .insert([
        {
          label: 'abc',
          value: 789
        },
      ]));
  }

  updateProduct() {
    return from(this.supabase
      .from('Product')
      .update(
        {
          label: 'update lable'
        })
      .eq('id', '18'))
  }

  deleteProduct() {
    return from(this.supabase
      .from('Product')
      .delete()
      .eq('id', '18'))
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
        })
      .eq(SColumn.id, productCategory[SColumn.id]))
  }

}
