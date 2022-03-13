import { PColumn } from '@enums/.';
import { SharedColumn } from './shared-column.class';

export class Product extends SharedColumn {
  [PColumn.label] = '';
  [PColumn.value] = 0;
}
