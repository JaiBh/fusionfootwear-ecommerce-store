"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DepartmentFilterProps {
  department: "Male" | "Female" | "Unisex" | undefined;
  addFilter: (submission: {
    type: "department" | "size" | "color";
    value: string;
  }) => void;
  resetFilter: (type: "color" | "size" | "price" | "department") => void;
}

export default function DepartmentFilter({
  department,
  addFilter,
  resetFilter,
}: DepartmentFilterProps) {
  return (
    <div className="bg-secondary p-6 space-y-4 rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-present-3-bold text-center">Department</h3>
        <Button
          variant={department === undefined ? "outline" : "destructive"}
          onClick={() => resetFilter("department")}
          className="cursor-pointer"
        >
          RESET
        </Button>
      </div>
      <Separator></Separator>
      <div className="text-present-4 flex gap-2 flex-col items-center">
        <Button
          variant={department === "Male" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => {
            addFilter({ type: "department", value: "Male" });
          }}
        >
          Men's
        </Button>
        <Button
          variant={department === "Female" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => {
            addFilter({ type: "department", value: "Female" });
          }}
        >
          Women's
        </Button>
        <Button
          variant={department === "Unisex" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => {
            addFilter({ type: "department", value: "Unisex" });
          }}
        >
          Only Unisex
        </Button>
      </div>
    </div>
  );
}
