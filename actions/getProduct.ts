import { Product } from "@/types";
import qs from "query-string";

interface Query {
  productId: string;
  isArchived?: boolean;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (query: Query): Promise<Product> => {
  const url = qs.stringifyUrl({
    url: `${URL}/${query.productId}`,
    query: {
      isArchived: query.isArchived,
    },
  });
  const resp = await fetch(url);
  return resp.json();
};

export default getProduct;
