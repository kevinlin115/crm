import { HasMode } from "@interfaces/mode.interface";

export interface ProductDetailData extends HasMode {
  label: string,
  value: number
}

export * from "./product-detail-dialog.component";
