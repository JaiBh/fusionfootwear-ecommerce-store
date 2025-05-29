"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Image from "next/image";
import ToggleSaveButton from "../global/ToggleSaveButton";
import RouteLink from "../global/RouteLink";

interface ProductsCarouselProps {
  products: Product[];
}

function ProductsCarousel({ products }: ProductsCarouselProps) {
  return (
    <Carousel className="md:mx-8">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-[65%] md:basis-[40%] lg:basis-[30%] h-full"
          >
            <RouteLink
              href={`/product/${product.id}`}
              className="w-full text-start"
            >
              <div className="border p-6 space-y-3">
                <div className="relative aspect-square w-full">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  ></Image>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-present-5-bold truncate">
                      {product.name}
                    </p>
                    <span className="text-present-5-bold text-primary">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </div>
                  <ToggleSaveButton productId={product.id}></ToggleSaveButton>
                </div>
              </div>
            </RouteLink>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="max-md:hidden" />
      <CarouselNext className="max-md:hidden" />
    </Carousel>
  );
}
export default ProductsCarousel;
