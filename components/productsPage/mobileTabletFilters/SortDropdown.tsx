"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelectedFiltersAtom } from "@/features/products/store/useSelectedFiltersAtom";
import { cn } from "@/lib/utils";

interface SortDropdownProps {
  filterWidth: number | undefined;
}

function SortDropdown({ filterWidth }: SortDropdownProps) {
  const [atom, setSelectedFilters] = useSelectedFiltersAtom();

  const addSort = (
    value: "a-z" | "z-a" | "price-high-to-low" | "price-low-to-high"
  ) => {
    setSelectedFilters({ ...atom, sortBy: value });
  };

  const clearSort = () => {
    setSelectedFilters({ ...atom, sortBy: undefined });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-none border p-6 cursor-pointer w-full"
          variant={"secondary"}
        >
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ width: filterWidth }} className="lg:hidden">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={cn(
              atom.sortBy === "a-z" &&
                "bg-primary text-white hover:!bg-primary hover:!text-white"
            )}
            onClick={() => {
              addSort("a-z");
            }}
          >
            Name A-Z
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              atom.sortBy === "z-a" &&
                "bg-primary text-white hover:!bg-primary hover:!text-white"
            )}
            onClick={() => {
              addSort("z-a");
            }}
          >
            Name Z-A
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              atom.sortBy === "price-high-to-low" &&
                "bg-primary text-white hover:!bg-primary hover:!text-white"
            )}
            onClick={() => {
              addSort("price-high-to-low");
            }}
          >
            Price high to low
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              atom.sortBy === "price-low-to-high" &&
                "bg-primary text-white hover:!bg-primary hover:!text-white"
            )}
            onClick={() => {
              addSort("price-low-to-high");
            }}
          >
            Price low to high
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default SortDropdown;
