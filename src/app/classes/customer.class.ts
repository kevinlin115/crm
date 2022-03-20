import { CColumn } from '@enums/.';
import { SharedColumn } from './shared-column.class';

export class Customer extends SharedColumn {
  [CColumn.name] = '';
  [CColumn.title] = '';
  [CColumn.mobile] = '';
}
