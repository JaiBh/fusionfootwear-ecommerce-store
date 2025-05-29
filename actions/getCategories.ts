import { Category } from "@/types";
import qs from "query-string";
interface Query {
  department?: string;
  isArchived?: boolean;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
const getCategories = async (query: Query): Promise<Category[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      department: query.department,
      isArchived: query.isArchived,
    },
  });
  const resp = await fetch(url);
  return resp.json();
};

export default getCategories;
