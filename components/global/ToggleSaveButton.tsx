"use client";

import { useGetUser } from "@/features/auth/api/useGetUser";
import { useLocalSavedProductsAtom } from "@/features/saved/store/useLocalSavedProductsAtom";
import isSavedProduct from "@/actions/isSavedProduct";
import useToggleSaveProduct from "@/hooks/useToggleSaveProduct";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

interface ToggleSaveButtonProps {
  productId: string;
  className?: string;
}

function ToggleSaveButton({ productId, className }: ToggleSaveButtonProps) {
  const [{ localSavedProductsIds }] = useLocalSavedProductsAtom();
  const [isSaved, setIsSaved] = useState(
    localSavedProductsIds.includes(productId)
  );
  const { data: user, isLoading: userIsLoading } = useGetUser();

  const { toggleSaveProduct, saveProductLoading } = useToggleSaveProduct(
    productId,
    isSaved
  );

  useEffect(() => {
    if (userIsLoading) return;
    let mounted = true;

    const init = async () => {
      try {
        const saved = await isSavedProduct({
          productId: productId,
          user,
          localSavedProductsIds,
        });
        if (!mounted) return;
        setIsSaved(saved);
      } catch (err) {
        console.log("Error checking if product is saved.", err);
      } finally {
        if (!mounted) return;
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, [userIsLoading, productId, user, localSavedProductsIds]);
  return (
    <button
      className={cn("bg-secondary p-2 rounded-[50%] cursor-pointer", className)}
      disabled={saveProductLoading}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (saveProductLoading) return;

        const prev = isSaved;
        setIsSaved(!prev);
        try {
          await toggleSaveProduct();
        } catch {
          setIsSaved(prev);
          //   error dealt with in toggleSaveProduct()
        }
      }}
    >
      {saveProductLoading ? (
        <motion.div
          className="max-md:size-4 size-5 border-4 border-t-transparent border-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 1,
          }}
        />
      ) : isSaved ? (
        <FaHeart className="text-destructive max-md:size-4 size-5"></FaHeart>
      ) : (
        <Heart className="dark:text-black group-hover:text-destructive transition group-hover:scale-[1.1] max-md:size-4 size-5"></Heart>
      )}
    </button>
  );
}
export default ToggleSaveButton;
