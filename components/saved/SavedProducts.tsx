"use client";

import { useGetUser } from "@/features/auth/api/useGetUser";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import RouteLink from "../global/RouteLink";
import { usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { useSaved } from "@/hooks/useSaved";

function SavedProducts() {
  const { data: user, isLoading: userIsLoading } = useGetUser();
  const pathname = usePathname();
  const [productHover, setProductHover] = useState("");
  const { savedProducts, isLoading: savedIsLoading, toggleSave } = useSaved();

  if (!userIsLoading && !user && savedProducts.length < 1) {
    return (
      <div className="mx-auto max-w-[250px] space-y-4 text-center pt-8 md:pt-12">
        <h2 className="text-present-2">You have no saved items</h2>
        <p>
          Browse and save items or sign in to sync all your saved items across
          all your devices.
        </p>
        <Button variant={"default"} className="w-full cursor-pointer" asChild>
          <RouteLink href={`/auth?redirect=${encodeURIComponent(pathname)}`}>
            SIGN IN
          </RouteLink>
        </Button>
      </div>
    );
  }

  if (!userIsLoading && user && !savedIsLoading && savedProducts.length < 1) {
    return (
      <div className="mx-auto max-w-[250px] space-y-4 text-center pt-8 md:pt-12">
        <h2 className="text-present-2">You have no saved items</h2>
        <p>
          Browse the store and save items by clicking on the little heart and
          they'll appear here.
        </p>
        <Button variant={"default"} className="w-full cursor-pointer" asChild>
          <RouteLink href={"/"}>START BROWSING</RouteLink>
        </Button>
      </div>
    );
  }
  return (
    <section className="grid grid-cols-2 auto-rows-fr gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 mb-8 md:mb-12">
      {userIsLoading || (user && savedIsLoading) ? (
        <SavedProductsLoader></SavedProductsLoader>
      ) : (
        savedProducts.map((product) => {
          console.log(product);
          const { id, name, images, price } = product;
          return (
            <RouteLink href={`/product/${id}`} key={id}>
              <Card className="h-full">
                <CardHeader className="relative aspect-square">
                  <Image
                    src={
                      images.length > 1
                        ? productHover === id
                          ? images[1].url
                          : images[0].url
                        : images[0].url
                    }
                    alt={`${name} image`}
                    fill
                    onMouseEnter={() => setProductHover(id)}
                    onMouseLeave={() => setProductHover("")}
                  ></Image>
                  <button
                    className="absolute top-[1rem] right-[1rem] bg-white p-2 rounded-[50%] cursor-pointer group"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleSave.mutate(product);
                    }}
                  >
                    <Trash
                      className="dark:text-black size-5 group-hover:text-destructive"
                      aria-label="Remove saved product"
                    ></Trash>
                  </button>
                </CardHeader>
                <CardContent>
                  <p className="text-present-4">{name}</p>
                  <p className="text-present-4-bold">
                    ${Number(price).toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </RouteLink>
          );
        })
      )}
    </section>
  );
}
export default SavedProducts;

function SavedProductsLoader() {
  const times = 8;
  return (
    <>
      {Array(times)
        .fill(null)
        .map((_, index) => {
          return (
            <div key={index}>
              <Skeleton className="aspect-square rounded-b-none"></Skeleton>
              <Skeleton className="h-12 rounded-t-none"></Skeleton>
            </div>
          );
        })}
    </>
  );
}
