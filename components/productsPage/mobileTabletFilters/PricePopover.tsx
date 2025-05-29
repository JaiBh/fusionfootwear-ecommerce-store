"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { DropdownMenuSeparator } from "../../ui/dropdown-menu";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { Product } from "@/types";

interface PricePopoverProps {
  filterWidth: number | undefined;
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

function PricePopover({
  filterWidth,
  price,
  resetFilter,
  priceInputValue,
  setPriceInputValue,
  addPriceFilter,
}: PricePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="rounded-none border p-6 cursor-pointer"
          variant={"secondary"}
        >
          Filter by price
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: filterWidth }} className="lg:hidden">
        <Label className="flex items-center justify-between">
          <h3 className="text-present-3-bold">Price</h3>
          <Button
            variant={
              price.min > 1 || price.max < 1000 ? "destructive" : "outline"
            }
            className="cursor-pointer"
            onClick={() => resetFilter("price")}
          >
            RESET
          </Button>
        </Label>
        <DropdownMenuSeparator className="my-3"></DropdownMenuSeparator>
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-[1fr_2fr] gap-2">
              <Label>Min price</Label>
              <div className="relative">
                <span className="absolute top-1/2 -translate-y-1/2 left-3">
                  $
                </span>
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
              </div>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2">
              <Label>Max price</Label>
              <div className="relative">
                <span className="absolute top-1/2 -translate-y-1/2 left-3">
                  $
                </span>
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
              </div>
            </div>
          </div>
          <Button className="w-full cursor-pointer" onClick={addPriceFilter}>
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default PricePopover;
