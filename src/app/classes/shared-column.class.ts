import { SColumn } from "@enums/.";

export class SharedColumn {
  [SColumn.id] = 0;
  [SColumn.created_at] = '';
  [SColumn.creator_email] = '';
  [SColumn.creator_uid] = '';
}

export const IndexColumn = 'IndexColumn' as const;
export const OperationColumn = 'OperationColumn' as const;
