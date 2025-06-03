"use client";

import getProducts from "@/actions/getProducts";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelectedFiltersAtom } from "@/features/products/store/useSelectedFiltersAtom";
import FullScreenLoading from "../global/FullScreenLoading";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import getSizes from "@/actions/getSizes";
import { Button } from "../ui/button";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface ProductsListProps {
  categoryId?: string;
  searchEnabled?: boolean;
  department?: "Male" | "Female";
}

function ProductsList({ categoryId, department }: ProductsListProps) {
  const searchparams = useSearchParams();
  const searchTerm = searchparams.get("search") || undefined;

  const [atom, setSelectedFilters] = useSelectedFiltersAtom();

  const {
    colorIds,
    sizeIds,
    price,
    department: departmentFilter,
    colorOptions,
    sortBy,
  } = atom;
  const [products, setProducts] = useState<Product[]>([]);
  const [nextCursor, setNextCursor] = useState<undefined | string>(undefined);
  const [productHover, setProductHover] = useState("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const hasInitializedFilters = useRef(false);
  const fetchProducts = async ({
    products,
    nextCursor,
  }: {
    products: Product[];
    nextCursor: string | undefined;
  }) => {
    setLoading(true);

    try {
      hasInitializedFilters.current = false;
      const previousProducts = products;
      const productsResp = await getProducts({
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
        cursor: nextCursor,
      });
      setProducts([...previousProducts, ...productsResp.products]);
      setTotalCount(productsResp.totalCount);
      setNextCursor(productsResp.nextCursor);
      if (colorOptions.length < 1) {
        setSelectedFilters({
          ...atom,
          colorOptions: productsResp.distinctColors,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      hasInitializedFilters.current = true;
    }
  };

  useEffect(() => {
    const init = async () => {
      hasInitializedFilters.current = false;

      try {
        const sizes = await getSizes({ department });
        setSelectedFilters({
          sizeOptions: sizes,
          colorOptions: [],
          colorIds: [],
          sizeIds: [],
          price: { min: 1, max: 1000 },
          department: undefined,
          sortBy: undefined,
        });
        hasInitializedFilters.current = true;
      } catch (err) {
        console.log("Error fetching sizes", err);
      }
    };
    init();
  }, [searchTerm]);

  useEffect(() => {
    if (!hasInitializedFilters.current) return;
    let mounted = true;
    const init = async () => {
      setProducts([]);
      setNextCursor(undefined);
      setTotalCount(0);
      if (mounted) {
        await fetchProducts({ products: [], nextCursor: undefined });
      }
    };
    init();

    return () => {
      mounted = false;
    };
  }, [searchTerm, departmentFilter, colorIds, sizeIds, price, sortBy]);

  if (products?.length < 1 && !loading) {
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
        {loading ? (
          <ProductsListLoader></ProductsListLoader>
        ) : (
          products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              productHover={productHover}
              setProductHover={setProductHover}
              searchTerm={searchTerm}
            ></ProductCard>
          ))
        )}
      </div>
      <Button
        className={cn("block mx-auto mt-8", !nextCursor && "hidden")}
        onClick={() => {
          fetchProducts({ products, nextCursor });
        }}
      >
        Load More
      </Button>
    </div>
  );
}
export default ProductsList;

function ProductsListLoader() {
  const times = 6;
  return (
    <>
      {Array(times)
        .fill(null)
        .map((_, index) => {
          return (
            <div key={index}>
              <Skeleton className="aspect-square rounded-b-none"></Skeleton>
              <Skeleton className="h-12 rounded-t-none"></Skeleton>
            </div>
          );
        })}
    </>
  );
}
