import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
const getProducts = async (
  department: "Male" | "Female" | undefined
): Promise<Product[]> => {
  const resp = await fetch(`${URL}/${department}`);
  return resp.json();
};

export default getProducts;
