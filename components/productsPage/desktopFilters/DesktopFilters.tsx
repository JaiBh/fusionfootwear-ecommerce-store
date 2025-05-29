"use client";

import { useState } from "react";
import { useFetchedProductsAtom } from "@/features/products/store/useFetchedProductsAtom";
import { useSelectedFiltersAtom } from "@/features/products/store/useSelectedFiltersAtom";
import SortBy from "./SortBy";
import ColorFilter from "./ColorFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import DepartmentFilter from "./DepartmentFilter";
import { cn } from "@/lib/utils";

interface DesktopFiltersProps {
  showSortBy?: boolean;
  showColorsFilter?: boolean;
  showPriceFilter?: boolean;
  showSizeFilter?: boolean;
  showDepartmentFilter?: boolean;
}

function DesktopFilters({
  showColorsFilter,
  showDepartmentFilter,
  showPriceFilter,
  showSizeFilter,
  showSortBy,
}: DesktopFiltersProps) {
  const [{ products }] = useFetchedProductsAtom();
  const [{ colorIds, sizeIds, price, department }, setSelectedFilters] =
    useSelectedFiltersAtom();
  const [priceInputValue, setPriceInputValue] = useState<{
    min: number;
    max: number;
  }>({ min: price.min, max: price.max });

  const removeFilter = (submission: {
    type: "color" | "size";
    value: string;
  }) => {
    if (submission.type === "color") {
      setSelectedFilters({
        department,
        colorIds: [
          ...colorIds.filter((colorId) => colorId !== submission.value),
        ],
        sizeIds: sizeIds,
        price,
      });
    } else {
      setSelectedFilters({
        department,
        colorIds,
        sizeIds: [...sizeIds.filter((sizeId) => sizeId !== submission.value)],
        price,
      });
    }
  };

  const addFilter = (submission: {
    type: "color" | "size" | "department";
    value: string;
  }) => {
    if (submission.type === "color") {
      if (colorIds.includes(submission.value)) {
        removeFilter({ type: "color", value: submission.value });
      } else {
        setSelectedFilters({
          department,
          colorIds: [...colorIds, submission.value],
          sizeIds: sizeIds,
          price,
        });
      }
    } else if (submission.type === "size") {
      if (sizeIds.includes(submission.value)) {
        removeFilter({ type: "size", value: submission.value });
      } else {
        setSelectedFilters({
          department,
          colorIds,
          sizeIds: [...sizeIds, submission.value],
          price,
        });
      }
    } else if (submission.type === "department") {
      if (submission.value === "mens") {
        if (department === "mens") {
          resetFilter("department");
        } else {
          setSelectedFilters({
            colorIds,
            price,
            sizeIds,
            department: "mens",
          });
        }
      } else if (submission.value === "womens") {
        if (department === "womens") {
          resetFilter("department");
        } else {
          setSelectedFilters({
            colorIds,
            price,
            sizeIds,
            department: "womens",
          });
        }
      } else if (submission.value === "unisex") {
        if (department === "unisex") {
          resetFilter("department");
        } else {
          setSelectedFilters({
            colorIds,
            price,
            sizeIds,
            department: "unisex",
          });
        }
      }
    }
  };

  const resetFilter = (type: "color" | "size" | "price" | "department") => {
    if (type === "color") {
      setSelectedFilters({ colorIds: [], sizeIds, price, department });
    } else if (type === "size") {
      setSelectedFilters({ colorIds, sizeIds: [], price, department });
    } else if (type === "price") {
      setSelectedFilters({
        department,
        colorIds,
        sizeIds,
        price: { min: 1, max: 1000 },
      });
      setPriceInputValue({ min: 1, max: 1000 });
    } else if (type === "department") {
      setSelectedFilters({
        department: undefined,
        colorIds,
        sizeIds,
        price,
      });
    }
  };

  const addPriceFilter = () => {
    if (priceInputValue.min <= priceInputValue.max) {
      setSelectedFilters({
        department,
        colorIds,
        sizeIds,
        price: { min: priceInputValue.min, max: priceInputValue.max },
      });
    }
  };

  return (
    <div className={cn("space-y-6")}>
      {showDepartmentFilter && (
        <DepartmentFilter
          department={department}
          addFilter={addFilter}
          resetFilter={resetFilter}
        ></DepartmentFilter>
      )}
      {showSortBy && <SortBy></SortBy>}
      {showColorsFilter && (
        <ColorFilter
          products={products}
          addFilter={addFilter}
          colorIds={colorIds}
          resetFilter={resetFilter}
        ></ColorFilter>
      )}
      {showPriceFilter && (
        <PriceFilter
          price={price}
          resetFilter={resetFilter}
          setPriceInputValue={setPriceInputValue}
          priceInputValue={priceInputValue}
          addPriceFilter={addPriceFilter}
        ></PriceFilter>
      )}
      {showSizeFilter && (
        <SizeFilter
          products={products}
          addFilter={addFilter}
          resetFilter={resetFilter}
          sizeIds={sizeIds}
        ></SizeFilter>
      )}
    </div>
  );
}
export default DesktopFilters;
