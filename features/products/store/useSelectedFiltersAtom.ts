import { Color, Size } from "@/types";
import { atom, useAtom } from "jotai";

const selectedFiltersState = atom<{
  colorOptions: Color[];
  sizeOptions: Size[];
  colorIds: string[];
  sizeIds: string[];
  price: { min: number; max: number };
  department: "mens" | "womens" | "unisex" | undefined;
  sortBy: "a-z" | "z-a" | "price-high-to-low" | "price-low-to-high" | undefined;
}>({
  colorOptions: [],
  sizeOptions: [],
  colorIds: [],
  sizeIds: [],
  price: {
    min: 1,
    max: 1000,
  },
  department: undefined,
  sortBy: undefined,
});

export const useSelectedFiltersAtom = () => {
  return useAtom(selectedFiltersState);
};
