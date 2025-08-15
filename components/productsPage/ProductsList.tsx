"use client";

import getProducts from "@/actions/getProducts";
import getSizes from "@/actions/getSizes";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelectedFiltersAtom } from "@/features/products/store/useSelectedFiltersAtom";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface ProductsListProps {
  categoryId?: string;
  searchEnabled?: boolean;
  department?: "mens" | "womens";
}

export default function ProductsList({
  categoryId,
  department,
}: ProductsListProps) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || undefined;
  const [productHover, setProductHover] = useState("");

  const [atom, setSelectedFilters] = useSelectedFiltersAtom();
  const {
    colorIds,
    sizeIds,
    price,
    department: departmentFilter,
    sortBy,
    colorOptions,
  } = atom;

  // 1) Sizes via useQuery (populate sizeOptions and reset filters on search changes)
  const sizesQuery = useQuery({
    queryKey: ["sizes", department],
    queryFn: () => getSizes({ department }),
    staleTime: 10 * 60 * 1000,
  });

  // Reset filter defaults when searchTerm changes or sizes load
  useEffect(() => {
    if (!sizesQuery.data) return;
    setSelectedFilters({
      sizeOptions: sizesQuery.data,
      colorOptions: [],
      colorIds: [],
      sizeIds: [],
      price: { min: 1, max: 1000 },
      department: undefined,
      sortBy: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sizesQuery.data]);

  const params = useMemo(
    () => ({
      isArchived: false,
      department: department || departmentFilter,
      categoryId,
      minPrice: price.min,
      maxPrice: price.max,
      sortBy,
      colorIds,
      sizeIds,
      searchTerm,
      paginate: true,
      take: 6,
    }),
    [
      department,
      departmentFilter,
      categoryId,
      price.min,
      price.max,
      sortBy,
      colorIds,
      sizeIds,
      searchTerm,
    ]
  );

  // 2) Products via useInfiniteQuery with cursor pagination
  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["products", params],
    enabled: sizesQuery.status === "success", // wait for filter defaults
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      try {
        const res = await getProducts({ ...params, cursor: pageParam });
        return res;
      } catch (e) {
        toast.error("Failed to load products");
        throw e;
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    // Keep old data while filters change slightly so UI does not flash
    placeholderData: (previous) => previous,
  });

  // Put distinctColors into atom once
  useEffect(() => {
    const first = data?.pages?.[0];
    if (!first) return;
    if ((colorOptions?.length || 0) < 1 && first.distinctColors?.length > 0) {
      setSelectedFilters((prev) => ({
        ...prev,
        colorOptions: first.distinctColors,
      }));
    }
  }, [data, colorOptions?.length, setSelectedFilters]);

  const products = useMemo(
    () => data?.pages.flatMap((p) => p.products) ?? [],
    [data]
  );
  const totalCount = data?.pages?.[0]?.totalCount ?? 0;

  if (!isLoading && products.length < 1) {
    return (
      <div className="space-y-10">
        <h1 className="text-present-3-bold lg:text-present-2 uppercase">
          No results found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-present-2">
        Showing {products.length} of {totalCount} products found
      </h2>

      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 auto-rows-fr">
        {isLoading ? (
          <ProductsListLoader />
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              productHover={productHover}
              setProductHover={setProductHover}
              searchTerm={searchTerm}
            />
          ))
        )}
      </div>

      <Button
        className={cn("block mx-auto mt-8", !hasNextPage && "hidden")}
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </Button>

      {/* Optional subtle refetch indicator */}
      {isFetching && !isFetchingNextPage && (
        <p className="text-xs text-muted-foreground text-center">
          Refreshing...
        </p>
      )}
      {error && (
        <div className="text-red-600 text-sm text-center">
          Something went wrong.{" "}
          <button className="underline" onClick={() => refetch()}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

function ProductsListLoader() {
  const times = 6;
  return (
    <>
      {Array(times)
        .fill(null)
        .map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-square rounded-b-none" />
            <Skeleton className="h-12 rounded-t-none" />
          </div>
        ))}
    </>
  );
}
