import { Category } from "@/types";
import qs from "query-string";
interface Query {
  categoryId: string;
  isArchived?: boolean;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (query: Query): Promise<Category> => {
  const url = qs.stringifyUrl({
    url: `${URL}/${query.categoryId}`,
    query: {
      isArchived: query.isArchived,
    },
  });
  const resp = await fetch(url);
  return resp.json();
};

export default getCategory;
