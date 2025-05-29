import { ProductLine } from "@/types";
import qs from "query-string";

interface Query {
  productLineId: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/productLines`;

const getProductLine = async (query: Query): Promise<ProductLine> => {
  const url = qs.stringifyUrl({
    url: `${URL}/${query.productLineId}`,
  });
  const resp = await fetch(url);
  return resp.json();
};

export default getProductLine;
