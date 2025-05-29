"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction } from "react";

interface PriceFilterProps {
  price: { min: number; max: number };
  resetFilter: (type: "color" | "size" | "price") => void;
  priceInputValue: { min: number; max: number };
  setPriceInputValue: Dispatch<
    SetStateAction<{
      min: number;
      max: number;
    }>
  >;
  addPriceFilter: () => void;
}

function PriceFilter({
  price,
  resetFilter,
  setPriceInputValue,
  priceInputValue,
  addPriceFilter,
}: PriceFilterProps) {
  return (
    <div className="bg-secondary p-6 space-y-4 rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-present-3-bold">Price</h3>
        <Button
          variant={
            price.min > 1 || price.max < 1000 ? "destructive" : "outline"
          }
          onClick={() => resetFilter("price")}
        >
          RESET
        </Button>
      </div>
      <Separator></Separator>
      <div className="space-y-4 dark:bg-secondary bg-white px-3 py-6 rounded">
        <div className="grid grid-cols-[1fr_2fr]">
          <Label>Min</Label>
          <div className="relative">
            <Input
              type="number"
              min={1}
              className="pl-7"
              value={priceInputValue.min < 1 ? "" : priceInputValue.min}
              onChange={(e) =>
                setPriceInputValue({
                  min: Number(e.target.value),
                  max: priceInputValue.max,
                })
              }
            ></Input>
            <span className="absolute top-1/2 -translate-y-[50%] left-3">
              $
            </span>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_2fr]">
          <Label>Max</Label>
          <div className="relative">
            <Input
              type="number"
              max={1000}
              className="pl-7"
              value={
                priceInputValue.max < 1
                  ? ""
                  : priceInputValue.max > 1000
                    ? 1000
                    : priceInputValue.max
              }
              onChange={(e) =>
                setPriceInputValue({
                  min: priceInputValue.min,
                  max: Number(e.target.value),
                })
              }
            ></Input>
            <span className="absolute top-1/2 -translate-y-[50%] left-3">
              $
            </span>
          </div>
        </div>
        <Button className="cursor-pointer w-full mt-2" onClick={addPriceFilter}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
export default PriceFilter;
