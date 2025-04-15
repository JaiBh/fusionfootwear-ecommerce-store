import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
const getCategories = async (
  department: "Male" | "Female" | undefined
): Promise<Category[]> => {
  const resp = await fetch(`${URL}/${department}`);
  return resp.json();
};

export default getCategories;
