"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import AudioButton from "./AudioButton";

const Navbar = ({ backgroundType }) => {
  const { setAlreadyEntered } = useGlobalState();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
    { href: "/", label: "Book of Truth", src: "/img/pfp-editor/icons/botr.png" },
    { href: "/roadmap", label: "Roadmap", src: "/img/pfp-editor/icons/roadmap.png" },
    { href: "/pfp-editor", label: "PFP Editor", src: "/img/pfp-editor/icons/paint.png" },
    { href: "/reader", label: "The Reader", src: "/img/pfp-editor/icons/reader.png" },
    { href: "/store", label: "Merch Store", src: "/img/pfp-editor/icons/merch.png" },
  ];

  const activeLabel = links.find((link) => link.href === pathname)?.label || "Book of Truth";

  const renderLinks = (isMobile = false) =>
    links.map(({ href, label, src }) => {
      return backgroundType === "editor" ? (
        label === "Book of Truth" ? null : (
          <div>
            <Link
              key={href}
              href={href}
              onClick={() => {
                setAlreadyEntered(true);
              }}
              className="flex flex-col items-center justify-center"
            >
              <Image src={src} alt={label} width={48} height={48} />
              <div className="bg-[#008682] px-1 mt-1">{label}</div>
            </Link>
          </div>
        )
      ) : (
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
      );
    });

  return (
    <>
      {backgroundType === "editor" ? (
        <>
          <div className="fixed top-0 h-24 w-full z-20 flex font-windows">
            <nav className="flex flex-row text-white text-sm gap-6 pl-2 pt-4">
              <div className="flex flex-col gap-4">
                <button className="flex flex-col items-center justify-center">
                  <Image
                    src="/img/pfp-editor/icons/system.png"
                    alt="System"
                    width={48}
                    height={48}
                  />
                  <div className="bg-[#008682] px-1 mt-1">System</div>
                </button>

                {renderLinks()}

                <button className="flex flex-col items-center justify-center">
                  <Image
                    src="/img/pfp-editor/icons/bin.png"
                    alt="Bin"
                    width={48}
                    height={48}
                  />
                  <div className="bg-[#008682] px-1 mt-1">Recycle Bin</div>
                </button>
              </div>

              <div>
                <Link
                  key="/"
                  href="/"
                  onClick={() => {
                    setAlreadyEntered(true);
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <Image
                    src="/img/pfp-editor/icons/botr.png"
                    alt="Book of Truth"
                    width={48}
                    height={48}
                  />
                  <div className="bg-[#008682] px-1 mt-1">Book of Truth</div>
                </Link>
              </div>

              <div>
              <div className="h-[11rem]"></div>
                <button className="flex flex-col items-center justify-center">
                  <Image
                    src="/img/pfp-editor/icons/music.png"
                    alt="Music"
                    width={48}
                    height={48}
                  />
                  <div className="bg-[#008682] px-1 mt-1">Music</div>
                </button>
              </div>

            </nav>

            <div className="ml-auto flex items-center">
              <Link
                href="/"
                onClick={() => setAlreadyEntered(true)}
                className="text-start font-gothic text-shadow-white-2 text-3xl sm:text-5xl flex-shrink-0 text-black pr-2"
              >
                {activeLabel}
              </Link>
            </div>
          </div>
        </>
      ) : (
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

              <AudioButton />

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
      )}
    </>
  );
};

export default Navbar;