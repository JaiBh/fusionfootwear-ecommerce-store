import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import TabletNav from "./TabletNav";

function Navbar() {
  return (
    <nav className="bg-secondary z-50">
      <MobileNav></MobileNav>
      <TabletNav></TabletNav>
      <DesktopNav></DesktopNav>
    </nav>
  );
}
export default Navbar;
