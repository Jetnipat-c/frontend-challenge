"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navbarMenu } from "@constants/navbarMenu.constant";
import { Button } from "@components/ui/button";

const NavbarMenu = () => {
  const pathname = usePathname();

  return (
    <ul className="sm:flex items-center justify-center space-x-4 font-normal text-base hidden">
      {navbarMenu.map((menu, idx) => (
        <li
          key={idx}
          className={`${
            pathname === menu.path ? "text-[#1F77DF]" : "text-[#7A8FA2]"
          } hover:text-primary transition-all duration-300 `}
        >
          <Link href={menu.path}>{menu.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarMenu;
