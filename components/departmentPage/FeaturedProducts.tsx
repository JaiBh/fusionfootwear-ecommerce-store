"use client";

import { Product } from "@/types";
import { useState } from "react";
import ProductsCarousel from "../ProductsCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

interface FeaturedProductsProps {
  products: Product[];
  categories: string[];
}
function FeaturedProducts({ products, categories }: FeaturedProductsProps) {
  const [category, setCategory] = useState<string>("All");

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
