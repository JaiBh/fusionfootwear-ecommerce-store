"use client";

import { Category, Product } from "@/types";
import { useEffect, useState } from "react";
import ProductsCarousel from "./ProductsCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import getProducts from "@/actions/getProducts";

interface FeaturedProductsProps {
  filterDepartment?: boolean;
}

function FeaturedProducts({ filterDepartment }: FeaturedProductsProps) {
  const [category, setCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [{ department }] = useDepartmentAtom();

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const resp = await getProducts({
          department: filterDepartment ? department : undefined,
          isArchived: false,
          isFeatured: true,
        }).then((products) =>
          products.filter(async (product) => {
            const units = product.units.filter(
              (unit) => unit.isArchived === false
            );
            if (units.length > 0) return product;
          })
        );
        const categoriesWithFeaturedProducts: string[] = [];
        resp.forEach((product) => {
          if (categoriesWithFeaturedProducts.includes(product.category.name)) {
            return;
          } else {
            categoriesWithFeaturedProducts.push(product.category.name);
          }
        });
        if (mounted) {
          setProducts(resp);
          setCategories(["All", ...categoriesWithFeaturedProducts]);
        }
      } catch (err) {
        console.log("Error when fetching featured products");
      }
    };
    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  if (products.length < 1) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-present-2">Featured Products</h2>
      <Carousel className="mx-8">
        <CarouselContent>
          {categories.map((item) => (
            <CarouselItem
              key={item}
              className="basis-auto"
              onClick={() => setCategory(item)}
            >
              <Button variant={category === item ? "default" : "ghost"}>
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <ProductsCarousel
        products={
          category === "All"
            ? products
            : products.filter((product) => product.category.name === category)
        }
      ></ProductsCarousel>
    </div>
  );
}
export default FeaturedProducts;
