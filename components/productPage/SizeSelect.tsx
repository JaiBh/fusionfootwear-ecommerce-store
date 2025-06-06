"use client";

import { Product, Size } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";

interface SizeSelectProps {
  product: Product;
  selectedSize: string | undefined;
  setSelectedSize: Dispatch<SetStateAction<string | undefined>>;
  sizes: Size[];
  outOfStock: boolean;
  disabled: boolean;
}

function SizeSelect({
  sizes,
  product,
  selectedSize,
  setSelectedSize,
  outOfStock,
  disabled,
}: SizeSelectProps) {
  const { department } = useDepartmentAtom();
  const [mounted, setMounted] = useState(false);
  const sizeOptions =
    department === "mens"
      ? sizes.filter(
          (size) => size.department === "mens" || size.department === "unisex"
        )
      : sizes.filter(
          (size) => size.department === "womens" || size.department === "unisex"
        );
  const formattedSizes = sizeOptions
    .sort((a, b) => Number(a.name) - Number(b.name))
    .map((sizeOption) => {
      const outOfStock =
        product.units.filter((unit) => unit.size.id === sizeOption.id).length <
        1;
      return {
        outOfStock,
        size: sizeOption,
      };
    });
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;
  return (
    <Select
      value={selectedSize}
      onValueChange={(value) => setSelectedSize(value)}
      disabled={outOfStock || disabled}
    >
      <SelectTrigger className="w-full max-w-[350px] cursor-pointer">
        <SelectValue
          placeholder={outOfStock ? "Out of stock" : "Select a size"}
        />
      </SelectTrigger>
      <SelectContent>
        {formattedSizes.map((formattedSize) => {
          return (
            <SelectItem
              key={formattedSize.size.id}
              value={formattedSize.size.id}
              disabled={formattedSize.outOfStock}
              className="cursor-pointer"
            >
              {formattedSize.size.name}
              {formattedSize.outOfStock && " - Out of stock"}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
export default SizeSelect;
