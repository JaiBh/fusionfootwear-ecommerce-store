"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface SortDropdownProps {
  filterWidth: number | undefined;
}

function SortDropdown({ filterWidth }: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy");

  const addSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    router.push(`?${params.toString()}`);
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
              sortBy === "a-z" &&
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
              sortBy === "z-a" &&
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
              sortBy === "price-high-to-low" &&
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
              sortBy === "price-low-to-high" &&
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
