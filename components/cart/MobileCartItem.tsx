"use client";

import { cn } from "@/lib/utils";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MobileCartItemProps {
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

function MobileCartItem({
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
}: MobileCartItemProps) {
  return (
    <li
      className={cn(
        "md:hidden space-y-4 py-4 border rounded-2xl px-2",
        outOfStock ? "border-red-500" : "border-x-transparent"
      )}
    >
      <div className="grid grid-cols-[auto_1fr] gap-4">
        {product.image ? (
          <div className="relative aspect-square h-20">
            <Image
              src={product.image}
              fill
              priority
              alt={product.name}
              className="object-cover rounded-xl"
            ></Image>
          </div>
        ) : (
          <div className="aspect-square h-20 bg-grey-300 text-xs flex items-center justify-center p-2 rounded-xl">
            No Image<br></br>Available
          </div>
        )}
        <div className="flex flex-col justify-between gap-4">
          <div className="flex justify-between items-between">
            <h4 className="text-present-3 font-semibold truncate">
              {product.name}
            </h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className="cursor-pointer hover:text-destructive"
                  aria-label="Remove from cart"
                  onClick={confirmRemoval}
                >
                  <Trash size={18}></Trash>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove from cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-present-4 font-semibold">
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
          </div>
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
export default MobileCartItem;
