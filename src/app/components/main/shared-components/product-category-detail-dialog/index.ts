import { ProductCategory } from "@classes/.";
import { HasMode } from "@interfaces/mode.interface";

export interface ProductCategoryDetailData extends HasMode {
  productCategory: ProductCategory,
}

export * from "./product-category-detail-dialog.component";

