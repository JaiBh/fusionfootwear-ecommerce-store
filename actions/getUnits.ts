import { Unit } from "@/types";
import qs from "query-string";

interface Query {
  productId: string;
  isArchived?: boolean;
  sizeId?: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/units`;
const getUnits = async (query: Query): Promise<Unit[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      productId: query.productId,
      isArchived: query.isArchived,
      sizeId: query.sizeId,
    },
  });
  const resp = await fetch(`${url}`);
  return resp.json();
};

export default getUnits;
