"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_LINKS } from "@/config/links";
import clsx from "clsx";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <ul className="hidden space-x-2 md:flex">
      {HEADER_LINKS.map((link) => (
        <li key={link.text}>
          <Link
            className={clsx(
              "rounded px-3 py-2 text-sm font-medium transition-colors duration-150",
              {
                ["text-accent-5 hover:bg-hover hover:text-accent-fg"]:
                  link.href !== pathname,
              },
              {
                ["bg-gray-300 dark:bg-[#333333]"]: link.href === pathname,
              }
            )}
            href={"/"}
            // href={link.href}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default Navbar;
