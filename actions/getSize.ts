import { Size } from "@/types";
import qs from "query-string";

interface Query {
  sizeId: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;
const getSize = async (query: Query): Promise<Size> => {
  const url = qs.stringifyUrl({
    url: `${URL}/${query.sizeId}`,
  });
  const resp = await fetch(`${url}`);
  return resp.json();
};

export default getSize;
