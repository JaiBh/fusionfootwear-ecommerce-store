import { cn } from "@/lib/utils";
import { Product, ProductLine as ProductLineType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface ProductLineProps {
  productLine: ProductLineType;
  setColor: Dispatch<SetStateAction<string>>;
  product: Product;
}

function ProductLine({ productLine, setColor, product }: ProductLineProps) {
  return (
    <div className="flex flex-wrap">
      {productLine.products
        .filter((item) => item.isArchived === false)
        .map((item) => {
          const outOfStock =
            item.units.filter((unit) => unit.isArchived === false).length < 1;

          if (outOfStock) {
            return (
              <div
                key={item.id}
                className="aspect-square relative h-18 border-[4px] cursor-not-allowed bg-grey-300"
                onMouseOver={() => {
                  setColor(`${item.color.name} - (out-of-stock)`);
                }}
                onMouseOut={() => {
                  setColor(product.color.name);
                }}
              >
                {item.images.length ? (
                  <Image
                    src={item.images[0].url}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover opacity-40"
                  ></Image>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs bg-grey-300">
                    No Image
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              href={`/product/${item.id}`}
              key={item.id}
              className={cn(
                "aspect-square relative h-18 border-[4px] cursor-pointer",
                product.id === item.id
                  ? "border-primary"
                  : "hover:border-primary-60"
              )}
              onMouseOver={() => {
                setColor(item.color.name);
              }}
              onMouseOut={() => {
                setColor(product.color.name);
              }}
            >
              {item.images.length ? (
                <Image
                  src={item.images[0].url}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                ></Image>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs bg-grey-300">
                  No Image
                </div>
              )}
            </Link>
          );
        })}
    </div>
  );
}
export default ProductLine;
