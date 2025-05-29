import { Product } from "@/types";
import qs from "query-string";

interface Query {
  department?: "Male" | "Female" | undefined;
  categoryId?: string;
  colorId?: string;
  isFeatured?: boolean;
  isArchived?: boolean;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      isArchived: query.isArchived,
      department: query.department,
    },
  });
  const resp = await fetch(`${url}`);
  return resp.json();
};

export default getProducts;
