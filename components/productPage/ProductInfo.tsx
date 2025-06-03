"use client";

import { Product, ProductLine as ProductLineType, Size } from "@/types";
import SizeSelect from "./SizeSelect";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useGetUser } from "@/features/auth/api/useGetUser";
import { useLocalSavedProductsAtom } from "@/features/saved/store/useLocalSavedProductsAtom";
import ProductLine from "./ProductLine";
import { useCartAtom } from "@/features/cart/store/useCartAtom";
import getUnits from "@/actions/getUnits";
import ToggleSaveButton from "../global/ToggleSaveButton";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";

interface ProductInfoProps {
  product: Product;
  sizes: Size[];
  productLine: ProductLineType | null;
}

function ProductInfo({ product, sizes, productLine }: ProductInfoProps) {
  const { data: user, isLoading: userIsLoading } = useGetUser();
  const [{ localSavedProductsIds }] = useLocalSavedProductsAtom();
  const [cartItems, setCartItems] = useCartAtom();
  const { department, setDepartmentAtom } = useDepartmentAtom();

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [color, setColor] = useState(product.color.name);
  const [outOfStock, setOutOfStock] = useState(false);
  const [loading, setLoading] = useState(true);

  const addToCart = async () => {
    try {
      setLoading(true);
      if (!selectedSize) {
        toast.error("Please select a size from the size options");
      } else {
        const quantityAlreadyInCart = cartItems.filter(
          (item) =>
            item.productId === product.id && item.sizeId === selectedSize
        );

        const sufficientStock =
          (
            await getUnits({
              productId: product.id,
              sizeId: selectedSize,
              isArchived: false,
            })
          ).length >=
          quantityAlreadyInCart.length + 1;
        if (sufficientStock) {
          // add to cart
          if (quantityAlreadyInCart.length > 0) {
            setCartItems(
              cartItems.map((cartItem) =>
                cartItem.productId === product.id
                  ? cartItem.sizeId === selectedSize
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                  : cartItem
              )
            );
          } else {
            const cartItem = {
              productId: product.id,
              quantity: 1,
              sizeId: selectedSize,
            };
            setCartItems([...cartItems, cartItem]);
          }
          toast.success(`${product.name} added to cart`);
        } else {
          toast.error("Oops, looks like this size just went out of stock!");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product.department !== "Unisex") {
      if (product.department !== department) {
        setDepartmentAtom(product.department);
      }
    }

    if (userIsLoading) return;
    let isMounted = true;

    const init = async () => {
      try {
        setLoading(true);
        const units = await getUnits({
          productId: product.id,
          isArchived: false,
        });
        if (isMounted) {
          setOutOfStock(units.length < 1);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    init();
    return () => {
      isMounted = false;
    };
  }, [
    user,
    userIsLoading,
    product.id,
    localSavedProductsIds,
    department,
    product.department,
    setDepartmentAtom,
  ]);

  return (
    <div className="max-md:w-[90vw] max-md:mx-auto space-y-4">
      <div className="space-y-4">
        <h1 className="text-present-2 md:text-present-1 flex items-center gap-2">
          {product.name}
          {outOfStock && (
            <span className="text-destructive text-present-3-bold md:text-present-2">
              (Out of Stock)
            </span>
          )}
        </h1>
        <h2 className="text-present-3-bold md:text-present-2">
          ${Number(product.price).toFixed(2)}
        </h2>
        <h3 className="text-present-4">
          <span className="text-present-4-bold">Color : </span>
          {color}
        </h3>
        {productLine && (
          <ProductLine
            product={product}
            productLine={productLine}
            setColor={setColor}
          ></ProductLine>
        )}
      </div>
      <Separator></Separator>
      <div className="flex flex-col gap-4">
        <h4 className="text-present-4-bold">Size : </h4>
        <div className="flex gap-4 items-center justify-between">
          <SizeSelect
            sizes={sizes}
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            outOfStock={outOfStock}
            disabled={loading}
          ></SizeSelect>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
          <Button
            className="w-full max-w-[300px]"
            disabled={loading || outOfStock}
            onClick={addToCart}
          >
            {outOfStock ? "Out of Stock" : "Add To Cart"}
          </Button>
          <ToggleSaveButton productId={product.id}></ToggleSaveButton>
        </div>
        <div className="space-y-4">
          <h4 className="text-present-4-bold">Description</h4>
          <p>{product.desc}</p>
        </div>
      </div>
    </div>
  );
}
export default ProductInfo;
