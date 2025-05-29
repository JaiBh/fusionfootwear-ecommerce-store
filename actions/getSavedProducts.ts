import { SavedProduct } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/savedProducts`;
const getSavedProducts = async (userId: string): Promise<SavedProduct[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      userId,
    },
  });
  const resp = await fetch(url);
  return resp.json();
};

export default getSavedProducts;
