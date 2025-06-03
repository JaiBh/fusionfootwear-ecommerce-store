"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Size } from "@/types";

interface SizeFilterProps {
  sizeOptions: Size[];
  sizeIds: string[];
  addFilter: (submission: { type: "color" | "size"; value: string }) => void;
  resetFilter: (type: "color" | "size" | "price") => void;
}

function SizeFilter({
  sizeOptions,
  sizeIds,
  addFilter,
  resetFilter,
}: SizeFilterProps) {
  return (
    <div className="bg-secondary p-6 space-y-4 rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-present-3-bold">Sizes</h3>
        <Button
          variant={sizeIds.length ? "destructive" : "outline"}
          className="cursor-pointer"
          onClick={() => resetFilter("size")}
        >
          CLEAR
        </Button>
      </div>
      <Separator></Separator>
      <div className="grid grid-cols-3 gap-2">
        {sizeOptions
          .sort((a, b) => Number(a.value) - Number(b.value))
          .map((size) => (
            <Button
              key={size.id}
              variant={sizeIds.includes(size.id) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => addFilter({ type: "size", value: size.id })}
            >
              {size.name}
            </Button>
          ))}
      </div>
    </div>
  );
}
export default SizeFilter;
