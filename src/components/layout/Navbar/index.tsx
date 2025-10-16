import MobileNavbar from "./NavbarMobile";
import DesktopNavbar from "./NavbarDesktop";

export default function Navbar() {
  return (
    <>
      {/* Mobile shown on small screens, hidden on md+ */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>

      {/* Desktop hidden on small screens, visible from md */}
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>
    </>
  );
}
