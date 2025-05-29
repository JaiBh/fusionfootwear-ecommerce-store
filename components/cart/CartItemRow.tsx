"use client";

import { CartItem as CartItemType } from "@/types";
import { useState } from "react";
import getUnits from "@/actions/getUnits";
import { toast } from "sonner";
import CartItem from "./CartItem";
import MobileCartItem from "./MobileCartItem";
import { useConfirmationModalAtom } from "@/features/modal/store/useConfirmationModalAtom";

interface CartItemRowProps {
  product: {
    productId: string;
    image: string | null;
    name: string;
    quantity: number;
    sizeName: string;
    sizeId: string;
    price: number;
    colorName: string;
    outOfStock: boolean;
  };
  cartItems: CartItemType[];
  setCartItems: (items: CartItemType[]) => void;
}

function CartItemRow({ product, setCartItems, cartItems }: CartItemRowProps) {
  const [_, setModal] = useConfirmationModalAtom();
  const [currentQuantity, setCurrentQuantity] = useState(product.quantity);
  const [outOfStock, setOutOfStock] = useState(product.outOfStock);
  const [updating, setUpdating] = useState(product.quantity === 0);
  const increaseQuantity = () => {
    if (currentQuantity + 1 === product.quantity) {
      setUpdating(false);
    } else {
      setUpdating(true);
    }
    setCurrentQuantity((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    if (currentQuantity - 1 === product.quantity) {
      setUpdating(false);
    } else {
      setUpdating(true);
    }
    setCurrentQuantity((prev) => prev - 1);
  };
  const removeItem = () => {
    setCartItems(
      cartItems.filter((cartItem) => {
        if (
          cartItem.productId === product.productId &&
          cartItem.sizeId === product.sizeId
        ) {
          return;
        } else {
          return cartItem;
        }
      })
    );
    toast.success(`${product.name} - ${product.sizeName} removed from cart.`);
    setUpdating(false);
  };

  const confirmRemoval = () => {
    setModal({
      open: true,
      title: `Removing ${product.name} from cart`,
      desc: `Are you sure you would like to remove ${product.name} - ${product.colorName} - ${product.sizeName} from your cart?`,
      buttonText: "Remove",
      buttonVariant: "destructive",
      action: removeItem,
    });
    console.log("yo");
  };

  const updateQuantity = async () => {
    try {
      if (currentQuantity < 1) {
        removeItem();
      } else {
        // check if stock is available
        const units = await getUnits({
          productId: product.productId,
          sizeId: product.sizeId,
          isArchived: false,
        });
        if (units.length && units.length >= currentQuantity) {
          setCartItems([
            ...cartItems.map((cartItem) => {
              if (
                cartItem.productId === product.productId &&
                cartItem.sizeId === product.sizeId
              ) {
                return { ...cartItem, quantity: currentQuantity };
              }
              return cartItem;
            }),
          ]);
          toast.success("Cart updated!");
          setUpdating(false);
        } else if (units.length) {
          setCurrentQuantity(units.length);
          setCartItems([
            ...cartItems.map((cartItem) => {
              if (
                cartItem.productId === product.productId &&
                cartItem.sizeId === product.sizeId
              ) {
                return { ...cartItem, quantity: units.length };
              }
              return cartItem;
            }),
          ]);
          toast.warning(
            `Due to limited stock, we have adjusted the number of ${product.name} in the cart.`
          );
          setUpdating(false);
        } else {
          toast.warning(
            `${product.name} - ${product.sizeName} is no longer in stock. Please remove from the cart if you wish to checkout.`
          );
          setCurrentQuantity(0);
          setOutOfStock(true);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <MobileCartItem
        setCurrentQuantity={setCurrentQuantity}
        setUpdating={setUpdating}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        updateQuantity={updateQuantity}
        currentQuantity={currentQuantity}
        product={product}
        updating={updating}
        outOfStock={outOfStock}
        confirmRemoval={confirmRemoval}
      ></MobileCartItem>
      <CartItem
        setCurrentQuantity={setCurrentQuantity}
        setUpdating={setUpdating}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        updateQuantity={updateQuantity}
        currentQuantity={currentQuantity}
        product={product}
        updating={updating}
        outOfStock={outOfStock}
        confirmRemoval={confirmRemoval}
      ></CartItem>
    </>
  );
}
export default CartItemRow;
