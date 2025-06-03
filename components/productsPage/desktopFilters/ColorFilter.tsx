"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Color } from "@/types";
import { Check } from "lucide-react";

interface ColorFilterProps {
  addFilter: (submission: { type: "color" | "size"; value: string }) => void;
  colorIds: string[];
  resetFilter: (type: "color" | "size" | "price") => void;
  colorOptions: Color[];
}

function ColorFilter({
  addFilter,
  colorIds,
  resetFilter,
  colorOptions,
}: ColorFilterProps) {
  return (
    <div className="bg-secondary p-6 space-y-4 rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-present-3-bold">Colors</h3>
        <Button
          variant={colorIds.length ? "destructive" : "outline"}
          className="cursor-pointer"
          onClick={() => resetFilter("color")}
        >
          CLEAR
        </Button>
      </div>
      <Separator></Separator>
      <div className="grid grid-cols-3 gap-6">
        {colorOptions.map((color) => (
          <div
            key={color.id}
            className="space-y-2 flex flex-col items-center cursor-pointer group"
            onClick={() => addFilter({ type: "color", value: color.id })}
          >
            <div
              key={color.id}
              className="size-[3rem] rounded-[50%] border-[3px] group-hover:scale-[0.85] transition relative"
              style={{ background: color.value }}
            >
              {colorIds.includes(color.id) && (
                <span
                  className={cn(
                    `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
                    color.name === "White" ||
                      color.name === "Yellow" ||
                      color.name === "Cyan"
                      ? "text-grey-900"
                      : "text-white"
                  )}
                >
                  <Check></Check>
                </span>
              )}
            </div>
            <p className="text-present-3 text-center">{color.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ColorFilter;
