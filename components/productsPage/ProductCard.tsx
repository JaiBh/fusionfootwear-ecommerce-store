import { Product } from "@/types";
import { SetStateAction, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import ToggleSaveButton from "../global/ToggleSaveButton";

interface ProductCardProps {
  product: Product;
  productHover: string;
  setProductHover: (value: SetStateAction<string>) => void;
}

function ProductCard({
  product,
  productHover,
  setProductHover,
}: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card>
        <CardHeader className="relative aspect-square">
          {product.images?.length ? (
            <Image
              src={
                product.images[1]?.url && productHover === product.id
                  ? product.images[1].url
                  : product.images[0].url
              }
              alt={`${product.name} image`}
              fill
              onMouseEnter={() => setProductHover(product.id)}
              onMouseLeave={() => setProductHover("")}
              className="object-cover"
            ></Image>
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-grey-300 text-sm">
              No Image Available
            </div>
          )}
          <ToggleSaveButton
            productId={product.id}
            className="absolute bottom-[1rem] right-[1rem] bg-white group"
          ></ToggleSaveButton>
        </CardHeader>
        <CardContent>
          <p className="text-present-4">{product.name}</p>
          <p className="text-present-4-bold">
            ${Number(product.price).toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
export default ProductCard;
