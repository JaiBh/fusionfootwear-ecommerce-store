"use client";

import { cn } from "@/lib/utils";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CartItemProps {
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
  currentQuantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  updateQuantity: () => void;
  updating: boolean;
  setCurrentQuantity: Dispatch<SetStateAction<number>>;
  setUpdating: Dispatch<SetStateAction<boolean>>;
  outOfStock: boolean;
  confirmRemoval: () => void;
}

function CartItem({
  product,
  currentQuantity,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  updating,
  setCurrentQuantity,
  setUpdating,
  outOfStock,
  confirmRemoval,
}: CartItemProps) {
  return (
    <li
      className={cn(
        "relative max-md:hidden space-y-2 py-6 border rounded-2xl px-2",
        outOfStock ? "border-red-500" : "border-x-transparent"
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            aria-label="Remove from cart"
            className="absolute top-[1rem] right-[1rem] cursor-pointer hover:text-destructive"
            onClick={confirmRemoval}
          >
            <X size={18}></X>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove from cart</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="flex items-center gap-6">
          {product.image ? (
            <div className="relative aspect-square h-26">
              <Image
                src={product.image}
                fill
                priority
                alt={product.name}
                className="object-cover rounded-2xl"
              ></Image>
            </div>
          ) : (
            <div className="aspect-square h-20 bg-grey-300 text-sm flex items-center justify-center p-2 rounded-2xl">
              No Image<br></br>Available
            </div>
          )}
          <div className="space-y-2">
            <h2 className="text-present-3 font-semibold">{product.name}</h2>
            <p className="text-present-4">
              <span className="font-semibold">Color : </span>
              {product.colorName}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 justify-items-center items-center">
          <h4 className="text-present-4">{product.sizeName}</h4>
          <h4 className="text-present-4">
            ${(product.price * currentQuantity).toFixed(2)}
          </h4>

          <div
            className={
              "bg-secondary grid grid-cols-3 items-center relative rounded"
            }
          >
            <div
              className={cn(
                "absolute w-full h-full cursor-not-allowed",
                !outOfStock && "hidden"
              )}
            ></div>
            <button
              className="p-[10px] cursor-pointer hover:text-primary-60 transition"
              onClick={decreaseQuantity}
              disabled={currentQuantity < 1 || product.outOfStock}
            >
              <Minus size={12}></Minus>
            </button>
            <span className="text-present-4 text-center">
              {currentQuantity}
            </span>
            <button
              className="p-[10px] cursor-pointer hover:text-primary-60 transition"
              onClick={increaseQuantity}
              disabled={outOfStock}
            >
              <Plus size={12}></Plus>
            </button>
          </div>

          <h4 className="text-present-4">${product.price.toFixed(2)}</h4>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          className={cn(!updating && "hidden")}
          variant={"destructive"}
          size={"sm"}
          onClick={() => {
            setCurrentQuantity(product.quantity);
            setUpdating(false);
          }}
        >
          Cancel
        </Button>
        <Button
          className={cn(!updating && "hidden")}
          variant={currentQuantity === 0 ? "destructive" : "default"}
          size={"sm"}
          onClick={updateQuantity}
        >
          {currentQuantity === 0 ? "Remove" : "Update"}
        </Button>
      </div>
    </li>
  );
}
export default CartItem;
