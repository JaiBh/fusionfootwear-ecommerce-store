import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

function CartLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <Link href={"/cart"} className="hover:text-primary transition">
            <ShoppingCart className="size-6"></ShoppingCart>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cart</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export default CartLink;
