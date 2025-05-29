import { DataModel } from "@/convex/_generated/dataModel";
import getSavedProduct from "./getSavedProduct";

interface Params {
  productId: string;
  user: DataModel["users"]["document"] | undefined;
  localSavedProductsIds: string[];
}

export const isSavedProduct = async ({
  productId,
  user,
  localSavedProductsIds,
}: Params) => {
  if (user?._id) {
    return (await getSavedProduct({ productId, userId: user._id })).length > 0;
  } else {
    return localSavedProductsIds.includes(productId);
  }
};

export default isSavedProduct;
