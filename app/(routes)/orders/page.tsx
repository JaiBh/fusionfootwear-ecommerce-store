"use client";

import getOrders from "@/actions/getOrders";
import Container from "@/components/global/Container";
import FullScreenLoading from "@/components/global/FullScreenLoading";
import RouteLink from "@/components/global/RouteLink";
import SingleOrder from "@/components/orders/SingleOrder";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/features/auth/api/useGetUser";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";
import { Order } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function OrdersPage() {
  const { data: user, isLoading: userIsLoading } = useGetUser();
  const { department } = useDepartmentAtom();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userIsLoading) return;
    let mounted = true;
    const init = async () => {
      try {
        if (!user?._id) {
          throw new Error("No user id was received.");
        }
        setLoading(true);
        const resp = await getOrders({ userId: user._id, isPaid: false });
        if (mounted) {
          setOrders(resp);
        }
      } catch (err) {
        toast.error(
          "There was an error fetching your orders. Please try again later."
        );
        console.log("Error fetching orders", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, [user, userIsLoading]);

  if (loading) {
    return <FullScreenLoading></FullScreenLoading>;
  }
  if (!loading && orders.length < 1) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-[280px] space-y-4 text-center ">
          <h2 className="text-present-2">No Orders Found</h2>
          <p>
            Browse our store, add items to your cart and checkout to see your
            order appear here
          </p>
          <Button asChild>
            <RouteLink href={`/${department}`}>Continue Shopping</RouteLink>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <Container className="mb-8">
      <h2 className="text-present-2 md:text-present-2 my-6 md:my-8 text-center">
        Your Orders
      </h2>
      <ul className="bg-secondary rounded-lg p-4 mx-auto max-w-[840px] space-y-4">
        {orders.map((order) => (
          <SingleOrder key={order.id} order={order}></SingleOrder>
        ))}
      </ul>
    </Container>
  );
}
export default OrdersPage;
