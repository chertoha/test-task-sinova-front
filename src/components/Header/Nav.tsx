"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsDatabaseFillGear } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

import ROUTES from "@/config/routes";

const nav = [
  { route: ROUTES.HOME, Icon: FaHome },
  { route: ROUTES.ADMIN, Icon: BsDatabaseFillGear },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      {nav.map(({ route, Icon }) => (
        <Link
          key={route}
          href={route}
          className={`hover:text-green-700 transition-colors duration-300 ease-in-out ${
            pathname === route ? "text-green-700" : "text-black"
          }`}
        >
          <Icon size={28} />
        </Link>
      ))}
    </nav>
  );
};
export default Nav;
