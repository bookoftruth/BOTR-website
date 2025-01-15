"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

const Navbar = ({ backgroundType }) => {
  const { isMuted, setIsMuted, setAlreadyEntered } = useGlobalState();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { href: "/", label: "Book of Truth" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/pfp-editor", label: "PFP Editor" },
    { href: "/reader", label: "The Reader" },
    { href: "/store", label: "Merch Store" },
  ];

  const activeLabel = links.find((link) => link.href === pathname)?.label || "Book of Truth";

  const renderLinks = (isMobile = false) =>
    links.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        onClick={() => {
          if (isMobile) setMenuOpen(false);
          setAlreadyEntered(true);
        }}
        className={`block px-4 py-2 ${
          pathname === href
            ? isMobile
              ? "text-black bg-gray-200"
              : "underline"
            : isMobile
            ? "hover:text-gray-200"
            : "text-white hover:text-gray-200"
        }`}
      >
        {label}
      </Link>
    ));

  return (
    <>
      <div
        className={`fixed top-0 h-24 w-full z-20 flex items-center px-4 ${
          backgroundType === "roadmap" || backgroundType === "soon"
            ? "backdrop-blur bg-black/30 shadow-lg"
            : ""
        }`}
      >
        <Link
          href="/"
          onClick={() => setAlreadyEntered(true)}
          className="text-start font-gothic text-shadow-white-2 text-3xl sm:text-5xl flex-shrink-0 text-black"
        >
          {activeLabel === "Roadmap" ? (
              <Image
                src="/img/roadmap/roadmap.png"
                alt="Roadmap"
                width={935}
                height={272}
                className="h-8 mt-1 sm:h-14 w-auto"
              />
          ) : (
            activeLabel
          )}
        </Link>

        <div className="ml-auto flex flex-row gap-6 xs:gap-10 items-center">
          <nav className="hidden xl:flex flex-row justify-center items-center text-2xl 2xl:text-3xl text-white text-shadow-black gap-6 xs:gap-10">
            {renderLinks()}
          </nav>

          <button
            onClick={toggleMute}
            className="p-1 bg-white text-black rounded-lg shadow-md border border-black hover:bg-gray-200 transition-colors z-20"
          >
            <Image
              src={`/img/icons/${isMuted ? "mute" : "sound"}.png`}
              alt={isMuted ? "Mute" : "Sound"}
              width={16}
              height={16}
            />
          </button>

          <button onClick={toggleMenu} className="xl:hidden">
            <Image
              src="/img/icons/menu.png"
              alt="menu"
              width={48}
              height={48}
            />
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-64 bg-black text-white shadow-lg transform xl:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-30`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          &times;
        </button>
        <nav className="flex flex-col mt-16 space-y-6 text-2xl">
          {renderLinks(true)}
        </nav>
      </div>
    </>
  );
};

export default Navbar;