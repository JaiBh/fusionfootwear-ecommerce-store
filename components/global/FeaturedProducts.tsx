"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";
import ProductsCarousel from "../departmentPage/ProductsCarousel";
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
import { Skeleton } from "../ui/skeleton";

interface FeaturedProductsProps {
  filterDepartment?: boolean;
}

function FeaturedProducts({ filterDepartment }: FeaturedProductsProps) {
  const [category, setCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { department, hydrate } = useDepartmentAtom();

  useEffect(() => {
    if (!hydrate) return;
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const resp = await getProducts({
          department: filterDepartment ? department : undefined,
          isArchived: false,
          isFeatured: true,
        });
        const categoriesWithFeaturedProducts: string[] = [];

        resp.products.forEach((product) => {
          if (categoriesWithFeaturedProducts.includes(product.category.name)) {
            return;
          } else {
            categoriesWithFeaturedProducts.push(product.category.name);
          }
        });
        if (mounted) {
          setProducts(resp.products);
          setCategories(["All", ...categoriesWithFeaturedProducts]);
        }
      } catch (err) {
        console.log("Error when fetching featured products", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    fetchProducts();
    return () => {
      mounted = false;
    };
  }, [department, filterDepartment, hydrate]);

  // if (!loading && categories.length < 1) return null;
  // if (!loading && products.length < 1) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-present-2">Featured Products</h2>
      {loading ? (
        <FeaturedProductsLoader></FeaturedProductsLoader>
      ) : (
        <>
          {" "}
          <Carousel className="md:mx-8">
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
            <CarouselPrevious className="max-md:hidden" />
            <CarouselNext className="max-md:hidden" />
          </Carousel>
          <ProductsCarousel
            products={
              category === "All"
                ? products
                : products.filter(
                    (product) => product.category.name === category
                  )
            }
          ></ProductsCarousel>
        </>
      )}
    </div>
  );
}
export default FeaturedProducts;

function FeaturedProductsLoader() {
  const carouselItems = 8;
  return (
    <>
      <Carousel className="md:mx-7">
        <CarouselContent>
          {Array(carouselItems)
            .fill(null)
            .map((_, index) => {
              return (
                <CarouselItem key={index} className="basis-auto">
                  <Skeleton className="w-[6.5rem] h-[2.25rem]"></Skeleton>
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </Carousel>
      <Carousel className="md:mx-7">
        <CarouselContent>
          {Array(carouselItems)
            .fill(null)
            .map((_, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="basis-[65%] md:basis-[40%] lg:basis-[30%] aspect-square relative"
                >
                  <Skeleton className="h-full w-full"></Skeleton>
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </Carousel>
    </>
  );
}
