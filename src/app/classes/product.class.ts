import { PColumn, Table } from '@enums/.';
import { ProductCategory } from './product-category.class';
import { SharedColumn } from './shared-column.class';

export class Product extends SharedColumn {
  [PColumn.product_category_id] = 0;
  [PColumn.label] = '';
  [PColumn.value] = 0;

  [Table.ProductCategory]?: ProductCategory
}
