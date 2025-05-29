"use client";

import getProduct from "@/actions/getProduct";
import getSize from "@/actions/getSize";
import getUnits from "@/actions/getUnits";
import CartItemsList from "@/components/cart/CartItemsList";
import Container from "@/components/global/Container";
import FullScreenLoading from "@/components/global/FullScreenLoading";
import { Button } from "@/components/ui/button";
import { useCartAtom } from "@/features/cart/store/useCartAtom";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import { CartItem } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CartInfo from "@/components/cart/CartInfo";
import CheckoutButton from "@/components/cart/CheckoutButton";

function CartPage() {
  const [cartItems, setCartItems] = useCartAtom();
  const [{ department }] = useDepartmentAtom();
  const [formattedCartItems, setFormattedCartItems] = useState<
    | {
        image: string | null;
        productId: string;
        name: string;
        quantity: number;
        sizeName: string;
        sizeId: string;
        price: number;
        colorName: string;
        outOfStock: boolean;
      }[]
    | undefined
  >(undefined);
  const [quantityAdjusted, setQuantityAdjusted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const formatItems = async () => {
      try {
        setIsLoading(true);

        const items = await Promise.all(
          cartItems.map(async (cartItem) => {
            const product = await getProduct({
              productId: cartItem.productId,
              isArchived: false,
            });
            const size = await getSize({ sizeId: cartItem.sizeId });
            if (size && product) {
              // if insufficient stock, adjust quantity
              const units = await getUnits({
                productId: cartItem.productId,
                sizeId: cartItem.sizeId,
                isArchived: false,
              });
              if (units.length >= cartItem.quantity) {
                return {
                  productId: product.id,
                  image: product.images?.[0]?.url || null,
                  name: product.name,
                  price: Number(product.price),
                  quantity: cartItem.quantity,
                  sizeName: size.name,
                  sizeId: size.id,
                  colorName: product.color.name,
                  colorId: product.color.id,
                  outOfStock: false,
                };
              } else {
                setQuantityAdjusted(true);
                return {
                  productId: product.id,
                  image: product.images?.[0]?.url || null,
                  name: product.name,
                  price: Number(product.price),
                  quantity: units.length,
                  sizeName: size.name,
                  sizeId: size.id,
                  colorName: product.color.name,
                  outOfStock: true,
                };
              }
            }
            return null;
          })
        );

        setFormattedCartItems(items.filter((item) => item !== null));
      } catch (err) {
        console.log("Error formatting cart items", err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    formatItems();
    if (quantityAdjusted) {
      toast.warning(
        "Due to limited stock, your cart has been adjusted to reflect availability."
      );
    }
    return () => {
      mounted = false;
    };
  }, [cartItems, quantityAdjusted, setQuantityAdjusted]);

  if (isLoading || formattedCartItems === undefined) {
    return <FullScreenLoading></FullScreenLoading>;
  }

  if (formattedCartItems.length < 1) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto max-w-[250px] space-y-4 text-center pt-8 md:pt-12">
          <h2 className="text-present-2">Your cart is empty</h2>
          <p>Browse the store and add items to your cart.</p>
          <Button variant={"default"} className="w-full cursor-pointer" asChild>
            <Link href={`/${department === "Female" ? "womens" : "mens"}`}>
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <section className="py-8 md:py-12 h-full max-lg:flex max-lg:flex-col">
      <h2 className="text-present-2 md:text-present-2 mb-6 md:mb-8 text-center">
        Your Cart
      </h2>
      <Container className="max-lg:flex-1 max-lg:flex max-lg:flex-col max-lg:justify-between max-lg:gap-6 lg:grid lg:grid-cols-[7fr_3fr] lg:gap-12">
        <CartItemsList
          formattedCartItems={formattedCartItems}
          cartItems={cartItems}
          setCartItems={(items: CartItem[]) => setCartItems(items)}
        ></CartItemsList>

        <div className="space-y-4 max-w-[400px] mx-auto w-full">
          <CartInfo formattedCartItems={formattedCartItems}></CartInfo>
          <CheckoutButton
            formattedCartItems={formattedCartItems}
          ></CheckoutButton>
        </div>
      </Container>
    </section>
  );
}
export default CartPage;
