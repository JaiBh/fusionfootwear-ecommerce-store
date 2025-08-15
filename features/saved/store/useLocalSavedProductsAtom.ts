import { Product } from "@/types";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const savedProductsState = atomWithStorage<{
  localSavedProducts: Product[];
}>("saved-products", {
  localSavedProducts: [],
});

export const useLocalSavedProductsAtom = () => {
  return useAtom(savedProductsState);
};
