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
  department: "Male" | "Female" | "Unisex" | undefined;
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
          <span>Department</span>
          <Button
            variant={department === undefined ? "outline" : "destructive"}
            onClick={() => resetFilter("department")}
            className="cursor-pointer text-xs"
            size={"sm"}
          >
            RESET
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={cn(
              department === "Male" &&
                "bg-primary text-white hover:!bg-primary hover:!text-white"
            )}
            onClick={() => {
              addFilter({ type: "department", value: "Male" });
            }}
          >
            Men's
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              department === "Female" &&
                "bg-primary text-white hover:!bg-primary hover:!text-white"
            )}
            onClick={() => {
              addFilter({ type: "department", value: "Female" });
            }}
          >
            Women's
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              department === "Unisex" &&
                "bg-primary text-white hover:!bg-primary hover:!text-white"
            )}
            onClick={() => {
              addFilter({ type: "department", value: "Unisex" });
            }}
          >
            Only Unisex
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default DepartmentDropdown;
