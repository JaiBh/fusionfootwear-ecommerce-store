import deleteSavedProduct from "@/actions/deleteSavedProduct";
import getProduct from "@/actions/getProduct";
import getSavedProducts from "@/actions/getSavedProducts";
import postSavedProduct from "@/actions/postSavedProduct";
import { useGetUser } from "@/features/auth/api/useGetUser";
import { useLocalSavedProductsAtom } from "@/features/saved/store/useLocalSavedProductsAtom";
import { Product, SavedProduct } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useSaved = () => {
  const { data: user, isLoading: userIsLoading } = useGetUser();
  const qc = useQueryClient();
  const [{ localSavedProducts }, setLocalSavedProducts] =
    useLocalSavedProductsAtom();
  const {
    data: savedProducts = [],
    isLoading,
    status,
  } = useQuery({
    queryKey: ["saved"],
    queryFn: () => getSavedProducts(user?._id),
    enabled: !userIsLoading && !!user,
  });

  useEffect(() => {
    const func = async () => {
      const products = await Promise.all(
        localSavedProducts.map(async (item) => {
          const product = await getProduct({
            productId: item.id,
            isArchived: false,
          });
          return product || null;
        })
      );
      setLocalSavedProducts({
        localSavedProducts: products.filter((item) => item),
      });
    };
    if (!user && !userIsLoading) {
      func();
    }
  }, [userIsLoading]);

  const toggleSave = useMutation({
    mutationFn: async (product: Product) => {
      if (user) {
        const current = qc.getQueryData<SavedProduct[]>(["saved"]) || [];
        if (current.some((item) => item.productId === product.id)) {
          await postSavedProduct({ productId: product.id, userId: user._id });
        } else {
          await deleteSavedProduct({ productId: product.id, userId: user._id });
        }
      } else {
        if (localSavedProducts.some((item) => item.id === product.id)) {
          setLocalSavedProducts({
            localSavedProducts: localSavedProducts.filter(
              (item) => item.id !== product.id
            ),
          });
        } else {
          setLocalSavedProducts({
            localSavedProducts: [...localSavedProducts, product],
          });
        }
      }
    },
    onMutate: async (product: Product) => {
      if (!user) return;
      await qc.cancelQueries({ queryKey: ["saved"] });
      const previous = qc.getQueryData<SavedProduct[]>(["saved"]) ?? [];
      // optimistically update cache
      const exists = previous.some((item) => item.product.id === product.id);
      const next = exists
        ? previous.filter((item) => item.product.id !== product.id)
        : [
            ...previous,
            {
              userId: user._id,
              product,
              id: crypto.randomUUID(),
              productId: product.id,
            } as SavedProduct,
          ];
      qc.setQueryData<SavedProduct[]>(["saved"], next);
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous && user) qc.setQueryData(["saved"], ctx.previous);
    },
    onSettled: () => {
      if (user) qc.invalidateQueries({ queryKey: ["saved"] });
    },
  });

  return {
    savedProducts: user
      ? savedProducts.filter((item) => item).map((item) => item.product) || []
      : localSavedProducts || [],
    status,
    isLoading,
    toggleSave,
  };
};
