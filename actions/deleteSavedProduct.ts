import { SavedProduct } from "@/types";

interface Query {
  productId: string;
  userId: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/savedProducts`;
const deleteSavedProduct = async (query: Query): Promise<SavedProduct[]> => {
  const resp = await fetch(`${URL}/${query.productId}?userId=${query.userId}`, {
    method: "DELETE",
  });
  return resp.json();
};

export default deleteSavedProduct;
