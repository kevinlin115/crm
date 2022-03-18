import { PColumn } from '@enums/.';
import { SharedColumn } from './shared-column.class';

export class Product extends SharedColumn {
  [PColumn.product_category_id] = 0;
  [PColumn.label] = '';
  [PColumn.value] = 0;
}
