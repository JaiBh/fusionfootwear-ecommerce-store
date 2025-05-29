import { Category, SavedProduct } from "@/types";
import qs from "query-string";
interface Query {
  userId: string;
  productId: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/savedProducts`;

const getSavedProduct = async (query: Query): Promise<SavedProduct[]> => {
  const url = qs.stringifyUrl({
    url: `${URL}/${query.productId}`,
    query: {
      userId: query.userId,
    },
  });
  const resp = await fetch(url);
  return resp.json();
};

export default getSavedProduct;
