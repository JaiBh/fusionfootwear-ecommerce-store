export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboardMale?: Billboard;
  billboardFemale?: Billboard;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  desc: string;
  department: "Male" | "Female" | "Unisex";
  isFeatured: boolean;
  isArchived: boolean;
  productLineId: string;
  productLine: ProductLine;
  images: Image[];
  color: Color;
  units: Unit[];
  category: Category;
}

export interface Image {
  id: string;
  url: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
  department: string;
}

export interface Unit {
  id: string;
  size: Size;
  isArchived: boolean;
}

export interface SavedProduct {
  id: string;
  userId: string;
  productId: string;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  price: string;
  shippingPrice: string;
  shippingOption: string;
  isPaid: boolean;
  status: string;
  orderItems: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  unitId: string;
  sizeId: string;
  colorId: string;
  name: string;
  colorName: string;
  sizeName: string;
  imageUrl: string;
  price: string;
}

export interface ProductLine {
  id: string;
  name: string;
  department: string;
  isArchived: boolean;
  products: Product[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  sizeId: string;
}

export type shippingOption =
  | "standard"
  | "eco-friendly"
  | "express"
  | "next-day";
