"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy");

  const addSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    router.push(`?${params.toString()}`);
  };

  const clearSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sortBy");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-secondary p-6 space-y-4 rounded">
      <div className="flex item-center justify-between">
        <h3 className="text-present-3-bold text-center">Sort By</h3>
        <Button
          variant={sortBy ? "destructive" : "outline"}
          onClick={clearSort}
        >
          CLEAR
        </Button>
      </div>
      <Separator></Separator>
      <div className="text-present-4 flex gap-2 flex-col items-center">
        <Button
          variant={sortBy === "a-z" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => addSort("a-z")}
        >
          A - Z
        </Button>
        <Button
          variant={sortBy === "z-a" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => addSort("z-a")}
        >
          Z - A
        </Button>
        <Button
          variant={sortBy === "price-low-to-high" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => addSort("price-low-to-high")}
        >
          Price low to high
        </Button>
        <Button
          variant={sortBy === "price-high-to-low" ? "default" : "outline"}
          className="w-full max-w-[12rem] cursor-pointer"
          onClick={() => addSort("price-high-to-low")}
        >
          Price high to low
        </Button>
      </div>
    </div>
  );
}
