import { Order, OrderItem } from "@/types";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { format } from "date-fns";
import RouteLink from "../global/RouteLink";

interface FormattedOrderItem extends OrderItem {
  quantity: number;
}

interface SingleOrderProps {
  order: Order;
}

function SingleOrder({ order }: SingleOrderProps) {
  const formattedOrderItems: FormattedOrderItem[] = order.orderItems.reduce(
    (acc: FormattedOrderItem[], curr) => {
      if (
        acc.some(
          (item) =>
            item.productId === curr.productId && item.sizeId === curr.sizeId
        )
      ) {
        return acc.map((item) => {
          if (
            item.productId === curr.productId &&
            item.sizeId === curr.sizeId
          ) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return [...acc, { ...curr, quantity: 1 }];
    },
    []
  );
  return (
    <li className="bg-card rounded p-4 lg:grid lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] lg:gap-5">
      <ScrollArea className="pb-3 max-lg:mb-2">
        <div className="flex gap-3">
          {formattedOrderItems.map((orderItem) => {
            return (
              <RouteLink
                key={orderItem.id}
                href={`/product/${orderItem.productId}`}
                className="relative aspect-square h-24"
              >
                {orderItem.imageUrl ? (
                  <Image
                    src={orderItem.imageUrl}
                    priority
                    fill
                    alt={orderItem.name}
                    className="object-cover rounded-lg"
                  ></Image>
                ) : (
                  <div className="h-full w-full flex text-center items-center bg-gray-300 text-xs rounded-lg">
                    No Image Available
                  </div>
                )}
              </RouteLink>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal"></ScrollBar>
      </ScrollArea>
      <div className="space-y-4">
        <h4 className="text-present-4 font-semibold text-center">
          Date : {format(order.createdAt, "MMMM do, yyyy")}
        </h4>
        <div className="flex items-center justify-between">
          <h4 className="text-present-4 font-semibold capitalize">
            Shipping : {order.shippingOption}
          </h4>
          <h4 className="text-present-4 font-semibold">
            Items : {order.orderItems.length}
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-present-4 font-semibold capitalize">
            Status : Processing
          </h4>
          <h4 className="text-present-4 font-semibold">
            Price : ${Number(order.price).toFixed(2)}
          </h4>
        </div>
      </div>
    </li>
  );
}
export default SingleOrder;
