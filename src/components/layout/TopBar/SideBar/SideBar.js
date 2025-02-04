'use client';

import clsx from "clsx";
import { useCallback, useEffect, useRef } from "react";
import NavLinks from "../NavLinks/NavLinks";

const SideBar = ({
  menuOpen,
  setMenuOpen,
  setAlreadyEntered,
  theme,
  pathname,
}) => {
  const menuRef = useRef();

  const handleClickOutside = useCallback(
    (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    },
    [setMenuOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  if (theme === "editor") return null;

  return (
    <div
      ref={menuRef}
      className={clsx(
        "fixed top-0 right-0 h-full w-full sm:w-64 bg-black text-white shadow-lg transform xl:hidden transition-transform duration-300 z-20",
        menuOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-4 right-4 text-2xl"
      >
        &times;
      </button>
      <nav className="flex flex-col mt-16 space-y-6 text-2xl">
        <NavLinks
          theme={theme}
          pathname={pathname}
          setMenuOpen={setMenuOpen}
          setAlreadyEntered={setAlreadyEntered}
          isMobile
        />
      </nav>
    </div>
  );
};

export default SideBar;