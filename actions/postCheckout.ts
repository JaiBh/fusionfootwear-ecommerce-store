import { shippingOption } from "@/types";

interface Query {
  userId?: string;
  userName?: string;
  unitIds: string[];
  price: number;
  shippingPrice: number;
  shippingOption: shippingOption;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/checkout`;

const postCheckout = async (query: Query): Promise<any> => {
  const resp = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });
  return resp.json();
};

export default postCheckout;
