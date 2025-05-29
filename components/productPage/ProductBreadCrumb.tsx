"use client";

import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import { Product } from "@/types";
import BreadCrumbTemplate from "../global/BreadCrumbTemplate";

interface ProductBreadCrumbProps {
  product: Product;
}

function ProductBreadCrumb({ product }: ProductBreadCrumbProps) {
  const [{ department }] = useDepartmentAtom();

  const navigationLinks = [
    { text: "Home", href: `/${department === "Male" ? "mens" : "womens"}` },
    {
      text: product.category.name,
      href: `/${department === "Male" ? "mens" : "womens"}/${product.category.id}`,
    },
    {
      text: product.name,
      href: "",
    },
  ];

  return <BreadCrumbTemplate links={navigationLinks}></BreadCrumbTemplate>;
}
export default ProductBreadCrumb;
