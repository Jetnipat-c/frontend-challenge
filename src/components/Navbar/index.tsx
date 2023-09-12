import Logo from "@components/Logo/Logo";
import NavbarMenu from "./NavbarMenu";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  return (
    <nav className="h-14 p-3 flex justify-between">
      <div className="flex items-center">
        <div className="mr-6">
          <Logo />
        </div>
        <NavbarMenu />
      </div>
      <ProfileMenu />
    </nav>
  );
};

export default Navbar;
