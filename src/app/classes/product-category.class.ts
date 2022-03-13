import { PCColumn } from '@enums/.';
import { SharedColumn } from ".";

export class ProductCategory extends SharedColumn {
  [PCColumn.order] = 0;
  [PCColumn.type] = '';
}
