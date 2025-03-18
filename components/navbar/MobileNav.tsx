"use client";

import { House, Search, ShoppingCart } from "lucide-react";
import MobileNavIcon from "./MobileNavIcon";

function MobileNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-screen grid grid-cols-3 pt-[1.125rem] pb-1 border-t">
      <MobileNavIcon Icon={House} title="Home" href="/"></MobileNavIcon>
      <MobileNavIcon
        Icon={Search}
        title="Explore"
        href="/explore"
      ></MobileNavIcon>
      <MobileNavIcon
        Icon={ShoppingCart}
        title="Cart"
        href="/cart"
      ></MobileNavIcon>
    </div>
  );
}
export default MobileNav;
