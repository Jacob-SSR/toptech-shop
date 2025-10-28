export interface Body {
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number | string;
  offerPrice?: number | string | null;
  condition: "new" | "used";
  percent?: number | null;
  defects?: string | null;
  description?: string | null;
  images: string[] | string;
  detailImages: string[] | string;
  stock: number | string;
  isFeatured?: boolean;
  status?: "active" | "inactive" | "draft";
  adminName?: string | null;
}
