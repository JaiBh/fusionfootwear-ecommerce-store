import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart } from "lucide-react";
import Link from "next/link";

function SavedProductsLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <Link href={"/saved"} className="hover:text-primary transition">
            <Heart className="size-6"></Heart>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Saved Products</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export default SavedProductsLink;
