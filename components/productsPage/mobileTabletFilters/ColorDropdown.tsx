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
import { Color, Product } from "@/types";
import { RefObject } from "react";

interface ColorDropdownProps {
  filterRef: RefObject<HTMLButtonElement | null>;
  filterWidth: number | undefined;
  colorIds: string[];
  addFilter: (submission: { type: "color" | "size"; value: string }) => void;
  resetFilter: (type: "color" | "size" | "price") => void;
  products: Product[];
}

function ColorDropdown({
  filterRef,
  filterWidth,
  resetFilter,
  colorIds,
  addFilter,
  products,
}: ColorDropdownProps) {
  const colorOptionsIds: string[] = [];
  const colorOptions: Color[] = [];

  products.forEach((product) => {
    if (!colorOptionsIds.includes(product.color.id)) {
      colorOptionsIds.push(product.color.id);
      colorOptions.push(product.color);
    }
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={filterRef}
          className="rounded-none border p-6 cursor-pointer"
          variant={"secondary"}
        >
          Filter by color
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ width: filterWidth }} className="lg:hidden">
        <DropdownMenuLabel className="flex items-center justify-between">
          <h3 className="text-present-3-bold">Colors</h3>
          <Button
            variant={colorIds.length ? "destructive" : "outline"}
            className="cursor-pointer"
            onClick={() => resetFilter("color")}
          >
            CLEAR
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuGroup className="pl-2 space-y-2 my-4">
          {colorOptions.map((color) => (
            <DropdownMenuItem
              key={color.id}
              className={cn(
                `rounded-[7px] overflow-hidden pl-0 py-0 bg-accent/50 cursor-pointer border-[2px] border-transparent`,
                colorIds.includes(color.id) &&
                  "bg-primary border-[2px] border-grey-900 text-white hover:!bg-primary hover:!text-white"
              )}
              onClick={(e) => {
                e.preventDefault();
                addFilter({ type: "color", value: color.id });
              }}
            >
              <div
                className="size-8 md:size-10"
                style={{ background: color.value }}
              ></div>
              <p
                className={cn(
                  "text-present-4",
                  colorIds.includes(color.id) && "font-bold"
                )}
              >
                {color.name}
              </p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ColorDropdown;
