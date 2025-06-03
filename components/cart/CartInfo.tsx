import { shippingOption } from "@/types";
import { Card, CardContent } from "../ui/card";

interface CartInfoProps {
  shippingOption: { option: shippingOption; price: number };
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

function CartInfo({ formattedCartItems, shippingOption }: CartInfoProps) {
  const ItemsPrice = formattedCartItems.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);
  }, 0);
  const shipping = shippingOption.price;
  const total = ItemsPrice + shipping;
  return (
    <Card>
      <CardContent className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-present-4 text-grey-500 dark:text-grey-300">
            Items (
            {formattedCartItems.reduce((acc, curr) => {
              return (acc += curr.quantity);
            }, 0)}
            )
          </span>
          <h4 className="text-present-4">${ItemsPrice.toFixed(2)}</h4>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-present-4 text-grey-500 dark:text-grey-300 capitalize">
            Shipping - {shippingOption.option}
          </span>
          <h4 className="text-present-4">${shipping.toFixed(2)}</h4>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-dashed">
          <h4 className="text-present-4-bold">Total Price</h4>
          <h4 className="text-present-4-bold text-primary">
            ${total.toFixed(2)}
          </h4>
        </div>
      </CardContent>
    </Card>
  );
}
export default CartInfo;
