import { Product, Unit } from "@/types";
import { atom, useAtom } from "jotai";

const fetchedProductsState = atom<{
  products: Product[];
}>({
  products: [],
});

export const useFetchedProductsAtom = () => {
  return useAtom(fetchedProductsState);
};
