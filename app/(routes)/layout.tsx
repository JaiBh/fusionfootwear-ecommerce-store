import Navbar from "@/components/navbar/Navbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
}
export default layout;
