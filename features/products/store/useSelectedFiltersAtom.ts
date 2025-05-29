import { atom, useAtom } from "jotai";

const selectedFiltersState = atom<{
  colorIds: string[];
  sizeIds: string[];
  price: { min: number; max: number };
  department: "mens" | "womens" | "unisex" | undefined;
}>({
  colorIds: [],
  sizeIds: [],
  price: {
    min: 1,
    max: 1000,
  },
  department: undefined,
});

export const useSelectedFiltersAtom = () => {
  return useAtom(selectedFiltersState);
};
