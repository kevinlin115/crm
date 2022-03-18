import { Product } from "@classes/.";
import { HasMode } from "@interfaces/mode.interface";

export interface ProductDetailData extends HasMode {
  product: Product
}

export * from "./product-detail-dialog.component";

