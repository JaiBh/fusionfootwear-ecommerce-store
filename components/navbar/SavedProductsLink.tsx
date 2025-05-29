import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart } from "lucide-react";
import RouteLink from "../global/RouteLink";

function SavedProductsLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <RouteLink
            href={"/saved"}
            className="hover:text-primary transition p-0 m-0 flex items-center"
          >
            <Heart className="size-6"></Heart>
          </RouteLink>
        </TooltipTrigger>
        <TooltipContent>
          <p>Saved Products</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export default SavedProductsLink;
