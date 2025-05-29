"use client";

import deleteSavedProduct from "@/actions/deleteSavedProduct";
import { useGetUser } from "@/features/auth/api/useGetUser";
import { useLocalSavedProductsAtom } from "@/features/saved/store/useLocalSavedProductsAtom";
import postSavedProduct from "@/actions/postSavedProduct";
import { useState } from "react";
import { toast } from "sonner";

const useToggleSaveProduct = (productId: string, isSavedProduct: boolean) => {
  const [{ localSavedProductsIds }, setLocalSavedProducts] =
    useLocalSavedProductsAtom();
  const [saveProductLoading, setSaveProductLoading] = useState(false);
  const { data: user, isLoading: userIsLoading } = useGetUser();

  const toggleSaveProduct = async () => {
    setSaveProductLoading(true);
    try {
      if (isSavedProduct) {
        user?._id
          ? await deleteSavedProduct({ productId, userId: user._id })
          : setLocalSavedProducts({
              localSavedProductsIds: localSavedProductsIds.filter(
                (item) => item !== productId
              ),
            });
      } else {
        user?._id
          ? await postSavedProduct({ productId, userId: user._id })
          : setLocalSavedProducts({
              localSavedProductsIds: [...localSavedProductsIds, productId],
            });
      }
    } catch (err) {
      console.log("Error toggling save product", err);
      toast.error(
        `There was an issue with ${isSavedProduct ? "un-saving" : "saving"} this product.`
      );
    } finally {
      setSaveProductLoading(false);
    }
  };
  return {
    toggleSaveProduct,
    saveProductLoading,
  };
};

export default useToggleSaveProduct;
