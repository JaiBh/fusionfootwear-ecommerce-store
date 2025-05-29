import { Order, Unit } from "@/types";
import qs from "query-string";

interface Query {
  userId: string;
  isPaid?: boolean;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;
const getOrders = async (query: Query): Promise<Order[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      userId: query.userId,
      isPaid: query.isPaid,
    },
  });
  const resp = await fetch(`${url}`);
  return resp.json();
};

export default getOrders;
