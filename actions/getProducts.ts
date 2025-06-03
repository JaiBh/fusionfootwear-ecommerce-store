import { Color, Product } from "@/types";
import qs from "query-string";

interface Query {
  department?: "Male" | "Female" | "Unisex" | undefined;
  categoryId?: string;
  colorIds?: string[];
  sizeIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  searchTerm?: string;
  isFeatured?: boolean;
  isArchived?: boolean;
  includeOutOfStock?: boolean;
  paginate?: boolean;
  take?: number;
  cursor?: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
const getProducts = async (
  query: Query
): Promise<{
  products: Product[];
  nextCursor: string;
  totalCount: number;
  distinctColors: Color[];
}> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      isArchived: query.isArchived,
      department: query.department,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      colorIds: query.colorIds,
      sizeIds: query.sizeIds,
      searchTerm: query.searchTerm,
      includeOutOfStock: query.includeOutOfStock,
      sortBy: query.sortBy,
      paginate: query.paginate,
      take: query.take,
      cursor: query.cursor,
    },
  });
  const resp = await fetch(`${url}`);
  return resp.json();
};

export default getProducts;
