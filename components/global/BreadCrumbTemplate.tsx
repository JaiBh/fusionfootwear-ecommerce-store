"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";

function BreadCrumbTemplate({
  links,
}: {
  links: { text: string; href: string }[];
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;
  return (
    <Breadcrumb className="p-6 flex justify-center">
      <BreadcrumbList>
        {links.map((link, index) => {
          if (index === links.length - 1) {
            return (
              <BreadcrumbItem key={link.href}>
                <BreadcrumbPage>{link.text}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          } else {
            return (
              <React.Fragment key={link.href}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={link.href}>{link.text}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
export default BreadCrumbTemplate;
