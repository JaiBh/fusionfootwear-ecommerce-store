import { CartItem } from "@/types";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const cartState = atomWithStorage<CartItem[]>("cart-items", []);

export const useCartAtom = () => {
  return useAtom(cartState);
};
