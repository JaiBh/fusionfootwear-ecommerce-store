"use client";

import { CartItem } from "@/types";
import CartItemRow from "./CartItemRow";

interface CartItemsListProps {
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
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

function CartItemsList({
  formattedCartItems,
  setCartItems,
  cartItems,
}: CartItemsListProps) {
  return (
    <div>
      <div className="max-md:hidden grid grid-cols-2 gap-4 pb-4 px-2">
        <h2 className="text-present-3 font-semibold">PRODUCT</h2>
        <div className="grid grid-cols-4 gap-4">
          <h2 className="text-present-3 font-semibold text-center">SIZE</h2>
          <h2 className="text-present-3 font-semibold text-center">PRICE</h2>
          <h2 className="text-present-3 font-semibold text-center">QTY</h2>
          <h2 className="text-present-3 font-semibold text-center">
            UNIT PRICE
          </h2>
        </div>
      </div>
      <ul>
        {formattedCartItems.map((product) => {
          return (
            <CartItemRow
              key={`${product.productId} - ${product.sizeId}`}
              product={product}
              setCartItems={setCartItems}
              cartItems={cartItems}
            ></CartItemRow>
          );
        })}
      </ul>
    </div>
  );
}
export default CartItemsList;
