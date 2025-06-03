"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { useState } from "react";

import NavSearchForm from "./NavSearchForm";

function SearchSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger className="cursor-pointer focus:outline-none">
        <Search></Search>
      </SheetTrigger>
      <SheetContent side="top" className="pb-8">
        <SheetHeader>
          <SheetTitle>Search for products</SheetTitle>
        </SheetHeader>
        <div className="px-6">
          <NavSearchForm></NavSearchForm>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default SearchSheet;
