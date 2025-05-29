"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Product, Size } from "@/types";
import { RefObject } from "react";

interface SizeDropdownProps {
  filterWidth: number | undefined;
  products: Product[];
  sizeIds: string[];
  addFilter: (submission: { type: "color" | "size"; value: string }) => void;
  resetFilter: (type: "color" | "size" | "price") => void;
}

function SizeDropdown({
  addFilter,
  resetFilter,
  filterWidth,
  sizeIds,
  products,
}: SizeDropdownProps) {
  const sizeOptionsIds: string[] = [];
  const sizeOptions: Size[] = [];

  products.forEach((product) => {
    product.units.forEach((unit) => {
      if (!sizeOptionsIds.includes(unit.size.id)) {
        sizeOptionsIds.push(unit.size.id);
        sizeOptions.push(unit.size);
      }
    });
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-none border p-6 cursor-pointer"
          variant={"secondary"}
        >
          Filter by size
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ width: filterWidth }} className="lg:hidden">
        <DropdownMenuLabel className="flex items-center justify-between">
          <h3 className="text-present-3-bold">Sizes</h3>
          <Button
            variant={sizeIds.length ? "destructive" : "outline"}
            className="cursor-pointer"
            onClick={() => resetFilter("size")}
          >
            CLEAR
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuGroup className="pl-2 space-y-2 my-4">
          {sizeOptions
            .sort((a, b) => Number(a.value) - Number(b.value))
            .map((size) => (
              <DropdownMenuItem
                key={size.id}
                className={cn(
                  "cursor-pointer",
                  sizeIds.includes(size.id) &&
                    "bg-primary text-white hover:!bg-primary hover:!text-white"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  addFilter({ type: "size", value: size.id });
                }}
              >
                {size.name}
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default SizeDropdown;
