import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
const getProduct = async (productId: string): Promise<Product> => {
  const resp = await fetch(`${URL}/department/${productId}`);
  return resp.json();
};

export default getProduct;
