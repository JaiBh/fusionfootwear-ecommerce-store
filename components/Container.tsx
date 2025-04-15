import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-[90vw] max-w-[1315px]">{children}</div>;
}
export default Container;
