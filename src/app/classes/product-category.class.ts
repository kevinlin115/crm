import { PCColumn } from '@enums/.';
import { SharedColumn } from './shared-column.class';

export class ProductCategory extends SharedColumn {
  [PCColumn.order] = 0;
  [PCColumn.type] = '';
}
