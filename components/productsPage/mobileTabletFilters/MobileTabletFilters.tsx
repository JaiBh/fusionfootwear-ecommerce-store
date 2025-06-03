"use client";

import { useEffect, useRef, useState } from "react";
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
  const [atom, setSelectedFilters] = useSelectedFiltersAtom();
  const { colorIds, sizeIds, price, department, colorOptions, sizeOptions } =
    atom;
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
      } else if (submission.value === "Female") {
        if (department === "Female") {
          resetFilter("department");
        } else {
          setSelectedFilters({
            ...atom,
            department: "Female",
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
      {showColorsFilter && colorOptions.length > 0 && (
        <ColorDropdown
          addFilter={addFilter}
          resetFilter={resetFilter}
          colorIds={colorIds}
          colorOptions={colorOptions}
          filterRef={filterRef}
          filterWidth={filterWidth}
        ></ColorDropdown>
      )}
      {showSizeFilter && sizeOptions.length > 0 && (
        <SizeDropdown
          addFilter={addFilter}
          resetFilter={resetFilter}
          filterWidth={filterWidth}
          sizeIds={sizeIds}
          sizeOptions={sizeOptions}
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
