import ClientDepartmentInitializer from "@/features/department/components/ClientDepartmentInitializer";
import { notFound } from "next/navigation";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ department: string }>;
}

async function layout({ children, params }: LayoutProps) {
  const validDepartments = ["mens", "womens"];
  const { department } = await params;
  if (!validDepartments.includes(department)) {
    notFound();
  }

  return (
    <>
      <ClientDepartmentInitializer department={department} />
      {children}
    </>
  );
}
export default layout;
