"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";

function ProductGallery({ product }: { product: Product }) {
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    product.images[0].url
  );
  return (
    <div className="grid gap-2 md:grid-cols-[96px_1fr] items-start">
      {/* selected/main image */}
      <div className="aspect-square relative md:order-2 w-full">
        <Image
          src={selectedImageUrl}
          alt={product.name}
          fill
          priority
          className="object-cover"
        ></Image>
      </div>
      {/* other product images */}
      <div className="flex md:order-1 md:flex-col flex-wrap">
        {product.images.map((image) => {
          return (
            <div
              key={image.url}
              className={cn(
                "aspect-square relative h-24 border-[4px] cursor-pointer",
                selectedImageUrl === image.url && "border-primary"
              )}
              onClick={() => setSelectedImageUrl(image.url)}
            >
              <Image
                src={image.url}
                alt={product.name}
                fill
                priority
                className="object-cover"
              ></Image>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ProductGallery;
