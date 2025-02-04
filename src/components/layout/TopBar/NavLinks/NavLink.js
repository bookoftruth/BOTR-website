'use client';

import clsx from "clsx";
import Link from "next/link";
import LinkTemplate from "./LinkTemplate";

const NavLink = ({
  theme,
  src,
  label,
  href,
  pathname,
  setMenuOpen,
  setAlreadyEntered,
  isMobile = false,
  bottomBar = false,
}) => (
  <Link
    href={href}
    onClick={() => {
      theme !== "editor" && setMenuOpen(false);
      setAlreadyEntered(true);
    }}
    className={clsx(
      theme === "editor"
        ? bottomBar ? "flex flex-row gap-2 items-center w-full p-2 text-lg hover:text-white hover:bg-windows-tertiary" : "flex flex-col items-center justify-center w-24 p-2"
        : "block px-4 py-2",
      pathname === href
        ? isMobile
          ? "text-black bg-gray-200"
          : theme === "editor"
            ? "bg-windows-tertiary border border-black"
            : "underline"
        : isMobile
          ? "hover:text-gray-200"
          : theme !== "editor" && "text-white hover:text-gray-200"
    )}
  >
    <LinkTemplate theme={theme} src={src} label={label} size={bottomBar ? 32 : 48} />
  </Link>
);

export default NavLink;