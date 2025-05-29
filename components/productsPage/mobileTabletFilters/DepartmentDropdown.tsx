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

interface DepartmentDropdownProps {
  filterWidth: number | undefined;
  addFilter: (submission: {
    type: "size" | "color" | "department";
    value: string;
  }) => void;
  department: "mens" | "womens" | "unisex" | undefined;
  resetFilter: (type: "color" | "size" | "price" | "department") => void;
}

function DepartmentDropdown({
  addFilter,
  filterWidth,
  department,
  resetFilter,
}: DepartmentDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-none border p-6 cursor-pointer w-full"
          variant={"secondary"}
        >
          Filter by department
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ width: filterWidth }} className="lg:hidden">
        <DropdownMenuLabel className="flex items-center justify-between max-md:flex-col max-md:gap-2">
          <span>Filter department</span>
          <Button
            variant={department === undefined ? "outline" : "destructive"}
            onClick={() => resetFilter("department")}
            className="cursor-pointer"
          >
            RESET
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={cn(
              department === "mens" &&
                "bg-primary text-white hover:!bg-primary hover:!text-white"
            )}
            onClick={() => {
              addFilter({ type: "department", value: "mens" });
            }}
          >
            Men's
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              department === "womens" &&
                "bg-primary text-white hover:!bg-primary hover:!text-white"
            )}
            onClick={() => {
              addFilter({ type: "department", value: "womens" });
            }}
          >
            Women's
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              department === "unisex" &&
                "bg-primary text-white hover:!bg-primary hover:!text-white"
            )}
            onClick={() => {
              addFilter({ type: "department", value: "unisex" });
            }}
          >
            Unisex
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default DepartmentDropdown;
