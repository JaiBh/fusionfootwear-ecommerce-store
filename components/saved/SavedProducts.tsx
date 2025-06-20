"use client";

import getProduct from "@/actions/getProduct";
import getSavedProducts from "@/actions/getSavedProducts";
import { useGetUser } from "@/features/auth/api/useGetUser";
import { useLocalSavedProductsAtom } from "@/features/saved/store/useLocalSavedProductsAtom";
import { Product } from "@/types";
import { useEffect, useState, MouseEvent } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import deleteSavedProduct from "@/actions/deleteSavedProduct";
import FullScreenLoading from "../global/FullScreenLoading";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import RouteLink from "../global/RouteLink";
import { usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

function SavedProducts() {
  const { data: user, isLoading: userIsLoading } = useGetUser();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [productHover, setProductHover] = useState("");
  const [{ localSavedProductsIds }, setLocalSavedProductsAtom] =
    useLocalSavedProductsAtom();

  const removeSavedProduct = async (e: MouseEvent, productId: string) => {
    e.stopPropagation();
    e.preventDefault();
    const prev = savedProducts;
    setSavedProducts(
      prev.filter((savedProduct) => savedProduct.id !== productId)
    );
    try {
      if (user?._id) {
        await deleteSavedProduct({ userId: user._id, productId });
      } else {
        setLocalSavedProductsAtom({
          localSavedProductsIds: localSavedProductsIds.filter(
            (id) => id !== productId
          ),
        });
      }
    } catch (err) {
      console.log("Error attempting removal of saved item", err);
      toast.error("Could not remove item");
      setSavedProducts(prev);
    }
  };

  useEffect(() => {
    // Prevent unnecessary fetching. Do not execute if user is removing a saved item from list.
    if (userIsLoading) return;
    if (savedProducts.length) return;
    let mounted = true;
    const updateSavedProducts = async () => {
      try {
        setIsLoading(true);

        if (user?._id) {
          const data = await getSavedProducts(user._id);
          if (mounted) {
            setSavedProducts(data.map((item) => item.product));
          }
        } else {
          const products = await Promise.all(
            localSavedProductsIds
              .reduce((acc: string[], curr) => {
                if (!acc.includes(curr)) {
                  acc.push(curr);
                }
                return acc;
              }, [])
              .map((item) => getProduct({ isArchived: false, productId: item }))
          );
          if (mounted) {
            setSavedProducts(products.filter(Boolean));
          }
        }
      } catch (err) {
        toast.error("Something went wrong loading your saved products.");
        console.log("Error loading saved products", err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    updateSavedProducts();

    return () => {
      mounted = false;
    };
  }, [user, userIsLoading, localSavedProductsIds]);

  if (!isLoading && !user && savedProducts.length < 1) {
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

  if (!isLoading && user && savedProducts.length < 1) {
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
      {isLoading ? (
        <SavedProductsLoader></SavedProductsLoader>
      ) : (
        savedProducts.map((product) => {
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
                      removeSavedProduct(e, id);
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
