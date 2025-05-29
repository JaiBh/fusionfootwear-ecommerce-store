"use client";

import { useEffect, useRef, useState } from "react";
import { useFetchedProductsAtom } from "@/features/products/store/useFetchedProductsAtom";
import { useSelectedFiltersAtom } from "@/features/products/store/useSelectedFiltersAtom";
import SortDropdown from "./SortDropdown";
import ColorDropdown from "./ColorDropdown";
import SizeDropdown from "./SizeDropdown";
import PricePopover from "./PricePopover";
import DepartmentDropdown from "./DepartmentDropdown";
import { cn } from "@/lib/utils";

interface MobileTabletFiltersProps {
  showSortBy?: boolean;
  showColorsFilter?: boolean;
  showPriceFilter?: boolean;
  showSizeFilter?: boolean;
  showDepartmentFilter?: boolean;
}

function MobileTabletFilters({
  showColorsFilter,
  showDepartmentFilter,
  showPriceFilter,
  showSizeFilter,
  showSortBy,
}: MobileTabletFiltersProps) {
  const [{ products }] = useFetchedProductsAtom();
  const [{ colorIds, sizeIds, price, department }, setSelectedFilters] =
    useSelectedFiltersAtom();
  const filterRef = useRef<HTMLButtonElement>(null);
  const [filterWidth, setFilterWidth] = useState<number | undefined>(undefined);
  const [priceInputValue, setPriceInputValue] = useState<{
    min: number;
    max: number;
  }>({ min: price.min, max: price.max });

  useEffect(() => {
    const updateDropdownMenuContentWidths = () => {
      if (filterRef.current) {
        setFilterWidth(filterRef.current.offsetWidth);
      }
    };

    // Run on mount
    updateDropdownMenuContentWidths();

    // Run on resize
    window.addEventListener("resize", updateDropdownMenuContentWidths);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", updateDropdownMenuContentWidths);
    };
  }, []);

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
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:hidden max-lg:w-[90vw] max-lg:max-w-[1315px] max-lg:mx-auto"
      )}
    >
      {showDepartmentFilter && (
        <DepartmentDropdown
          department={department}
          filterWidth={filterWidth}
          addFilter={addFilter}
          resetFilter={resetFilter}
        ></DepartmentDropdown>
      )}
      {showSortBy && <SortDropdown filterWidth={filterWidth}></SortDropdown>}
      {showColorsFilter && (
        <ColorDropdown
          addFilter={addFilter}
          resetFilter={resetFilter}
          colorIds={colorIds}
          products={products}
          filterRef={filterRef}
          filterWidth={filterWidth}
        ></ColorDropdown>
      )}
      {showSizeFilter && (
        <SizeDropdown
          addFilter={addFilter}
          resetFilter={resetFilter}
          filterWidth={filterWidth}
          sizeIds={sizeIds}
          products={products}
        ></SizeDropdown>
      )}
      {showPriceFilter && (
        <PricePopover
          filterWidth={filterWidth}
          setPriceInputValue={setPriceInputValue}
          priceInputValue={priceInputValue}
          price={price}
          resetFilter={resetFilter}
          addPriceFilter={addPriceFilter}
        ></PricePopover>
      )}
    </div>
  );
}
export default MobileTabletFilters;
