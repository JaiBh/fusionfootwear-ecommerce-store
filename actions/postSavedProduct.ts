import { SavedProduct } from "@/types";
interface Body {
  userId: string;
  productId: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/savedProducts`;
const postSavedProduct = async (body: Body): Promise<SavedProduct> => {
  const resp = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return resp.json();
};

export default postSavedProduct;
