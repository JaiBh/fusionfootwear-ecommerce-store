import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
const getCategory = async (categoryId: string): Promise<Category> => {
  const resp = await fetch(`${URL}/department/${categoryId}`);
  return resp.json();
};

export default getCategory;
