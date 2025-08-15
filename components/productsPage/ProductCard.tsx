import { Product } from "@/types";
import { SetStateAction } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import ToggleSaveButton from "../global/ToggleSaveButton";
import RouteLink from "../global/RouteLink";

interface ProductCardProps {
  product: Product;
  productHover: string;
  setProductHover: (value: SetStateAction<string>) => void;
  searchTerm: string | undefined;
}

function ProductCard({
  product,
  productHover,
  setProductHover,
  searchTerm,
}: ProductCardProps) {
  return (
    <RouteLink href={`/product/${product.id}`}>
      <Card className="h-full">
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
            product={product}
            className="absolute bottom-[1rem] right-[1rem] bg-white group"
          ></ToggleSaveButton>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-present-4">{product.name}</p>
          <div className="flex items-center justify-between">
            <p className="text-present-4-bold">
              ${Number(product.price).toFixed(2)}
            </p>
            {searchTerm?.length && (
              <p className="text-present-4">{product.category.name}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </RouteLink>
  );
}
export default ProductCard;
