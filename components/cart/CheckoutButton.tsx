"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import getUnits from "@/actions/getUnits";
import { toast } from "sonner";
import postCheckout from "@/actions/postCheckout";
import { useGetUser } from "@/features/auth/api/useGetUser";
import { useSearchParams } from "next/navigation";
import { useCartAtom } from "@/features/cart/store/useCartAtom";

interface CheckoutButtonProps {
  formattedCartItems: {
    image: string | null;
    productId: string;
    name: string;
    quantity: number;
    sizeName: string;
    sizeId: string;
    price: number;
    colorName: string;
    outOfStock: boolean;
  }[];
}

function CheckoutButton({ formattedCartItems }: CheckoutButtonProps) {
  const { data: user, isLoading: userIsLoading } = useGetUser();
  const [_, setCartItems] = useCartAtom();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const ItemsPrice = formattedCartItems.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);
  }, 0);
  const shipping = 4.99;
  const total = ItemsPrice + shipping;

  const finalStockCheck = async () => {
    let pass = false;
    const unitIds: string[] = [];
    try {
      const check = await Promise.all(
        formattedCartItems.map(async (cartItem) => {
          const units = await getUnits({
            productId: cartItem.productId,
            sizeId: cartItem.sizeId,
            isArchived: false,
          });
          if (units.length > 0) {
            unitIds.push(
              ...units.slice(0, cartItem.quantity).map((item) => item.id)
            );
          }
          return units.length >= cartItem.quantity;
        })
      );
      pass = !check.includes(false);
    } catch (err) {
      console.log("Error during final stock check", err);
      pass = false;
    } finally {
      return { pass, unitIds };
    }
  };

  const checkout = async () => {
    if (userIsLoading) return;
    try {
      setLoading(true);
      const { pass, unitIds } = await finalStockCheck();
      if (!pass) {
        toast.error(
          "There was an issue checking out this cart. One or more of your items may have just ran out of stock. Please try again later."
        );
        return;
      }
      const resp = await postCheckout({
        userId: user?._id,
        userName: user?.name,
        unitIds,
        price: total,
        shippingPrice: shipping,
        shippingOption: "standard",
      });
      window.location = resp.url;
    } catch (err) {
      console.log("Error checking out", err);
      toast.error(
        "There was an issue checking out this cart. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeAll = () => {
    setCartItems([]);
  };

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed!");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams]);

  return (
    <Button
      className="w-full py-6"
      disabled={loading || userIsLoading || formattedCartItems.length < 1}
      onClick={checkout}
    >
      CHECKOUT
    </Button>
  );
}
export default CheckoutButton;
