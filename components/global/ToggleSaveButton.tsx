"use client";

import { useGetUser } from "@/features/auth/api/useGetUser";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSaved } from "@/hooks/useSaved";
import { Product } from "@/types";

interface ToggleSaveButtonProps {
  product: Product;
  className?: string;
}

function ToggleSaveButton({ product, className }: ToggleSaveButtonProps) {
  const { data: user, isLoading: userIsLoading } = useGetUser();
  const { savedProducts, toggleSave, isLoading } = useSaved();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(savedProducts.some((item) => item.id === product.id));
  }, [savedProducts]);
  return (
    <button
      className={cn(
        "bg-secondary dark:bg-white/90 p-2 rounded-[50%] cursor-pointer group",
        className
      )}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        toggleSave.mutate(product);
      }}
    >
      {userIsLoading || (user && isLoading) ? (
        <motion.div
          className="max-md:size-4 size-5 border-4 border-t-transparent border-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 1,
          }}
        />
      ) : saved ? (
        <FaHeart className="text-destructive max-md:size-4 size-5"></FaHeart>
      ) : (
        <Heart className="dark:text-black group-hover:text-destructive transition group-hover:scale-[1.1] max-md:size-4 size-5"></Heart>
      )}
    </button>
  );
}
export default ToggleSaveButton;
