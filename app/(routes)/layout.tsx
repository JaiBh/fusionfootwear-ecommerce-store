import Footer from "@/components/global/Footer";
import Navbar from "@/components/navbar/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen md:min-h-[110vh]">
      <Navbar></Navbar>
      <main className="min-h-0">{children}</main>
      <Footer></Footer>
    </div>
  );
}
export default Layout;
