import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const savedProductsState = atomWithStorage<{
  localSavedProductsIds: string[];
}>("saved-products", {
  localSavedProductsIds: [],
});

export const useLocalSavedProductsAtom = () => {
  return useAtom(savedProductsState);
};
