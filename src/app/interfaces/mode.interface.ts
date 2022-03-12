export interface HasMode {
  mode: Mode
}

export enum Mode {
  Add,
  Edit,
  View
}

export const ModeText: { [key in Mode]: string } = {
  [Mode.Add]: '新增',
  [Mode.Edit]: '編輯',
  [Mode.View]: '檢視',
}
