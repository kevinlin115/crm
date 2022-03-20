import { Injectable } from '@angular/core';
import { Logger, Product, ProductCategory } from '@classes/.';
import { PCColumn, PColumn, SColumn, Table } from '@enums/.';
import { from, Subject } from 'rxjs';
import { AuthService } from '.';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  $productCategoryUpdate = new Subject();

  get supabase() { return this.authService.supabase; }

  private logger = new Logger('Product-Service');

  constructor(
    private authService: AuthService,
  ) { }

  getProducts(range?: { from: number, to: number }) {
    this.logger.table(`Product range = `, range);
    let api = this.supabase
      .from(Table.Product)
      .select(`
        *,
        ${Table.ProductCategory} (
          ${PCColumn.type}
        )
      `, { count: 'exact' })
    if (range) {
      api = api.range(range.from, range.to);
    }
    return from(api);
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
      .select('*', { count: 'exact' })
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
