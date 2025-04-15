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
  price: number;
  desc: string;
  isFeatured: boolean;
  isArchived: boolean;
  images: Image[];
  category: Category;
}

export interface Image {
  id: string;
  url: string;
}
