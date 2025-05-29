import getProduct from "@/actions/getProduct";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface ProductAdProps {
  productId: string;
}

async function ProductAd({ productId }: ProductAdProps) {
  let product = undefined;

  try {
    const resp = await getProduct({ productId });
    product = resp;
  } catch {}

  if (product === undefined) return null;

  return (
    <div className="relative aspect-[16_/_10] md:aspect-[16_/_7] max-h-[43rem] bg-primary-60">
      <Image
        src={product.images[0].url}
        alt={`${product.name} image`}
        fill
        priority
        className="object-cover opacity-50"
      ></Image>
      <div className="absolute top-0 left-0 w-full h-full p-6 md:p-12 flex max-md:items-center lg:items-center">
        <div className="text-white space-y-4">
          <h1 className="text-present-2 md:text-present-1 lg:text-[3rem]">
            {product.name} <br></br> {product.category.name}
          </h1>
          <div>
            <p className="max-md:hidden text-present-3 lg:text-2xl">
              Performance and design. Taken right to the edge.
            </p>
            <Button variant={"link"} asChild>
              <Link
                href={`/product/${product.id}`}
                className="text-white text-present-3-bold pl-0 underline hover:text-primary lg:text-xl"
              >
                Shop Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductAd;
