import { SColumn } from "@enums/.";

export class SharedColumn {
  [SColumn.id] = 0;
  [SColumn.created_at] = '';
  [SColumn.creator_email] = '';
  [SColumn.creator_uid] = '';
}
