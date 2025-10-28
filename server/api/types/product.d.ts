export interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category:
    | "smartphone"
    | "tablet"
    | "notebook"
    | "monitor"
    | "earpods"
    | "desktop"
    | "gadget"
    | "accessories"
    | "console";
  price: number;
  priceNew: number;
  priceUsed: number;
  offerPrice?: number | null;
  condition: "new" | "used";
  percent?: number | null;
  defects?: string | null;
  description?: string | null;
  images: string[];
  detailImages: string[];
  stock: number;
  isFeatured: boolean;
  status: "active" | "inactive" | "draft";
  adminName?: string | null;
  createdAt: string;
  updatedAt: string;
}
