"use client";

import { useState } from "react";
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
  const [atom, setSelectedFilters] = useSelectedFiltersAtom();
  const { colorIds, sizeIds, price, department, colorOptions, sizeOptions } =
    atom;
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
        ...atom,
        colorIds: [
          ...colorIds.filter((colorId) => colorId !== submission.value),
        ],
        sizeIds: sizeIds,
      });
    } else {
      setSelectedFilters({
        ...atom,
        sizeIds: [...sizeIds.filter((sizeId) => sizeId !== submission.value)],
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
          ...atom,
          colorIds: [...colorIds, submission.value],
          sizeIds: sizeIds,
        });
      }
    } else if (submission.type === "size") {
      if (sizeIds.includes(submission.value)) {
        removeFilter({ type: "size", value: submission.value });
      } else {
        setSelectedFilters({
          ...atom,
          sizeIds: [...sizeIds, submission.value],
        });
      }
    } else if (submission.type === "department") {
      if (submission.value === "Male") {
        if (department === "Male") {
          resetFilter("department");
        } else {
          setSelectedFilters({
            ...atom,
            department: "Male",
          });
        }
      } else if (submission.value === "Female") {
        if (department === "Female") {
          resetFilter("department");
        } else {
          setSelectedFilters({
            ...atom,
            department: "Female",
          });
        }
      } else if (submission.value === "Unisex") {
        if (department === "Unisex") {
          resetFilter("department");
        } else {
          setSelectedFilters({
            ...atom,
            department: "Unisex",
          });
        }
      }
    }
  };

  const resetFilter = (type: "color" | "size" | "price" | "department") => {
    if (type === "color") {
      setSelectedFilters({ ...atom, colorIds: [] });
    } else if (type === "size") {
      setSelectedFilters({ ...atom, sizeIds: [] });
    } else if (type === "price") {
      setSelectedFilters({
        ...atom,
        price: { min: 1, max: 1000 },
      });
      setPriceInputValue({ min: 1, max: 1000 });
    } else if (type === "department") {
      setSelectedFilters({
        ...atom,
        department: undefined,
      });
    }
  };

  const addPriceFilter = () => {
    if (priceInputValue.min <= priceInputValue.max) {
      setSelectedFilters({
        ...atom,
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
      {showColorsFilter && colorOptions.length > 0 && (
        <ColorFilter
          addFilter={addFilter}
          colorIds={colorIds}
          resetFilter={resetFilter}
          colorOptions={colorOptions}
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
      {showSizeFilter && sizeOptions.length > 0 && (
        <SizeFilter
          addFilter={addFilter}
          resetFilter={resetFilter}
          sizeOptions={sizeOptions}
          sizeIds={sizeIds}
        ></SizeFilter>
      )}
    </div>
  );
}
export default DesktopFilters;
