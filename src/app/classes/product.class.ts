import { PColumn } from '@enums/.';
import { SharedColumn } from ".";

export class Product extends SharedColumn {
  [PColumn.label] = '';
  [PColumn.value] = 0;
}
