"use client";

import getProducts from "@/actions/getProducts";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useFetchedProductsAtom } from "@/features/products/store/useFetchedProductsAtom";
import { useSelectedFiltersAtom } from "@/features/products/store/useSelectedFiltersAtom";
import FullScreenLoading from "../global/FullScreenLoading";
import { toast } from "sonner";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  categoryId?: string;
  searchEnabled?: boolean;
  department?: "Male" | "Female";
}

function ProductsList({
  categoryId,
  searchEnabled,
  department,
}: ProductsListProps) {
  const searchparams = useSearchParams();
  const sortBy = searchparams.get("sortBy") || undefined;
  const searchTerm = searchparams.get("search");

  const [
    { colorIds, sizeIds, price, department: departmentFilter },
    setSelectedFilters,
  ] = useSelectedFiltersAtom();
  const [{ products }, setProductsAtom] = useFetchedProductsAtom();
  const [productHover, setProductHover] = useState("");
  const [loading, setLoading] = useState(true);

  const refinedProducts = useMemo(() => {
    let updatedProducts = [...products];

    // Filter by search term
    if (searchEnabled && searchTerm) {
      updatedProducts = updatedProducts.filter((product) => {
        let pass = false;
        if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          pass = true;
        }
        if (
          product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          pass = true;
        }
        return pass;
      });
    }
    // Filter by color
    if (colorIds.length) {
      updatedProducts = updatedProducts.filter((product) =>
        colorIds.includes(product.color?.id)
      );
    }

    // Filter by size
    if (sizeIds.length) {
      updatedProducts = updatedProducts.filter((product) => {
        let pass = false;
        for (const unit of product.units) {
          if (sizeIds.includes(unit.size?.id) && !unit.isArchived) {
            pass = true;
            break;
          }
        }
        return pass;
      });
    }

    // Filter by price
    updatedProducts = updatedProducts.filter(
      (product) =>
        Number(product.price) >= price.min && Number(product.price) <= price.max
    );

    // Filter by department
    if (departmentFilter) {
      if (departmentFilter === "mens") {
        updatedProducts = updatedProducts.filter(
          (product) =>
            product.department === "Male" || product.department === "Unisex"
        );
      } else if (departmentFilter === "womens") {
        updatedProducts = updatedProducts.filter(
          (product) =>
            product.department === "Female" || product.department === "Unisex"
        );
      } else if (departmentFilter === "unisex") {
        updatedProducts = updatedProducts.filter(
          (product) => product.department === "Unisex"
        );
      }
    }

    if (sortBy === "a-z") {
      updatedProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sortBy === "z-a") {
      updatedProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else if (sortBy === "price-high-to-low") {
      updatedProducts.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "price-low-to-high") {
      updatedProducts.sort((a, b) => Number(a.price) - Number(b.price));
    }
    return updatedProducts;
  }, [
    colorIds,
    sizeIds,
    sortBy,
    price,
    products,
    departmentFilter,
    searchTerm,
  ]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const productsResp = await getProducts({
          isArchived: false,
          department,
          categoryId,
        });
        const data = productsResp.filter((item) =>
          item.units.some((unit) => !unit.isArchived)
        );
        if (mounted) {
          setProductsAtom({ products: data });
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    setSelectedFilters({
      colorIds: [],
      sizeIds: [],
      price: { min: 1, max: 1000 },
      department: undefined,
    });

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [department, categoryId, searchTerm]);

  if (loading) {
    return <FullScreenLoading></FullScreenLoading>;
  }

  if (refinedProducts?.length < 1 && !loading) {
    return (
      <div className="space-y-10">
        <h1 className="text-present-3-bold lg:text-present-2 uppercase">
          No results found
        </h1>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
      {refinedProducts?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          productHover={productHover}
          setProductHover={setProductHover}
        ></ProductCard>
      ))}
    </div>
  );
}
export default ProductsList;
