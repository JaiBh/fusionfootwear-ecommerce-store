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
import Link from "next/link";

interface ProductsCarouselProps {
  products: Product[];
}

function ProductsCarousel({ products }: ProductsCarouselProps) {
  return (
    <Carousel className="mx-8">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <Link href={`/product/${product.id}`}>
              <div className="border p-6 space-y-3">
                <div className="relative aspect-square w-full">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                  ></Image>
                </div>
                <div>
                  <p className="text-present-5-bold">{product.name}</p>
                  <span className="text-present-5-bold text-primary">
                    ${product.price}
                  </span>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
export default ProductsCarousel;
