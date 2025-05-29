import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShoppingCart } from "lucide-react";
import RouteLink from "../global/RouteLink";

function CartLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <RouteLink
            href={"/cart"}
            className="hover:text-primary transition  flex items-center"
          >
            <ShoppingCart className="size-6"></ShoppingCart>
          </RouteLink>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cart</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export default CartLink;
