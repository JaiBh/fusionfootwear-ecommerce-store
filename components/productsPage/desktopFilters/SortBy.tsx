"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSelectedFiltersAtom } from "@/features/products/store/useSelectedFiltersAtom";

export default function SortBy() {
  const [atom, setSelectedFilters] = useSelectedFiltersAtom();

  const addSort = (
    value: "a-z" | "z-a" | "price-high-to-low" | "price-low-to-high"
  ) => {
    setSelectedFilters({ ...atom, sortBy: value });
  };

  const clearSort = () => {
    setSelectedFilters({ ...atom, sortBy: undefined });
  };

  return (
    <div className="bg-secondary p-6 space-y-4 rounded">
      <div className="flex item-center justify-between">
        <h3 className="text-present-3-bold text-center">Sort By</h3>
        <Button
          variant={atom.sortBy ? "destructive" : "outline"}
          onClick={clearSort}
        >
          CLEAR
        </Button>
      </div>
      <Separator></Separator>
      <div className="text-present-4 flex gap-2 flex-col items-center">
        <Button
          variant={atom.sortBy === "a-z" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => addSort("a-z")}
        >
          A - Z
        </Button>
        <Button
          variant={atom.sortBy === "z-a" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => addSort("z-a")}
        >
          Z - A
        </Button>
        <Button
          variant={atom.sortBy === "price-low-to-high" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => addSort("price-low-to-high")}
        >
          Price low to high
        </Button>
        <Button
          variant={atom.sortBy === "price-high-to-low" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => addSort("price-high-to-low")}
        >
          Price high to low
        </Button>
      </div>
    </div>
  );
}
