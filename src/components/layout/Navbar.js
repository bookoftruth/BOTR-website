"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalState } from "@/utils/GlobalStateContext";
import AudioButton from "./AudioButton";
import { navLinks } from '@/utils/utils';
import clsx from "clsx";

const Title = ({ theme, setAlreadyEntered, activeLabel }) => (
  <div
    className={clsx(theme === "editor" && "ml-auto flex items-center pr-2")}
  >
    <Link
      href="/"
      onClick={() => setAlreadyEntered(true)}
      className={clsx("text-start font-gothic text-shadow-white-2 text-3xl sm:text-5xl flex-shrink-0 text-black",
        theme === "editor" && "text-[#008082]"
      )}
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
  </div>
);

const SideButtons = ({ theme, setMenuOpen, menuOpen }) => {
  if (theme === "editor") return null;

  return (
    <>
      <AudioButton />
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="xl:hidden"
      >
        <Image
          src="/img/icons/menu.png"
          alt="menu"
          width={48}
          height={48}
        />
      </button>
    </>
  );
};

const LinkTemplate = ({ theme, src, label, size }) => (
  <>
    {theme === "editor" && (
      <Image src={src} alt={label} width={size} height={size} />
    )}
    <div
      className={clsx(theme === "editor" && "mt-1 whitespace-nowrap")}
    >
      {label}
    </div>
  </>
);

const NavLink = ({
  theme,
  src,
  label,
  href,
  pathname,
  setMenuOpen,
  setAlreadyEntered,
  isMobile = false,
}) => (
  <Link
    href={href}
    onClick={() => {
        setMenuOpen(false);
        setAlreadyEntered(true);
    }}
    className={clsx(
      theme === "editor"
        ? "flex flex-col items-center justify-center w-24 p-2"
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
    <LinkTemplate theme={theme} src={src} label={label} size={48} />
  </Link>
);

const NavLinks = ({
  theme,
  pathname,
  setMenuOpen,
  setAlreadyEntered,
  isMobile,
  activateWindow
}) => (
  <>
    {theme === "editor" && (
      <DesktopShortcut
        theme={theme}
        src="/img/image-editor/icons/system.png"
        label="My Computer"
        size={48}
        activateWindow={activateWindow}
      />
    )}
    {navLinks.map(
      ({ href, label, src }) =>
        !(theme === "editor" && label === "Book of Truth") &&
        (theme === "editor" && label === "Image Editor" ? (
          <DesktopShortcut
            key={href}
            theme={theme}
            src={src}
            label={label}
            size={48}
            activateWindow={activateWindow}
          />
        ) : (
          <NavLink
            key={href}
            theme={theme}
            src={src}
            label={label}
            href={href}
            pathname={pathname}
            setMenuOpen={setMenuOpen}
            setAlreadyEntered={setAlreadyEntered}
            isMobile={isMobile}
          />
        ))
    )}
    {theme === "editor" && (
      <DesktopShortcut
        theme={theme}
        src="/img/image-editor/icons/bin.png"
        label="Recycle Bin"
        size={48}
        activateWindow={activateWindow}
      />
    )}
  </>
);


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

const DesktopShortcut = ({ theme, src, label, size, activateWindow }) => (
  <button
    onClick={() => {
      if (theme === "editor") {
        if (label === "Image Editor") {
          activateWindow(0);
        } else if (label === "Recycle Bin") {
          activateWindow(1);
        } else if (label === "My Computer") {
          activateWindow(2);
        }
      }
    }}
    className="flex flex-col items-center justify-center p-2 w-24"
  >
    <LinkTemplate theme={theme} src={src} label={label} size={size} />
  </button>
);

const Navbar = ({ theme, activateWindow }) => {
  const { setAlreadyEntered } = useGlobalState();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLabel = navLinks.find((link) => link.href === pathname)?.label || "Book of Truth";

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 h-24 w-full z-10 flex text-white",
          theme === "editor"
            ? "font-windows flex-row-reverse"
            : "items-center px-4 text-shadow-black",
          (theme === "roadmap" || theme === "soon") &&
            "backdrop-blur bg-black/30 shadow-lg"
        )}
      >
        <Title
          theme={theme}
          setAlreadyEntered={setAlreadyEntered}
          activeLabel={activeLabel}
        />

        <div
          className={clsx(
            theme !== "editor" &&
              "ml-auto flex flex-row gap-6 sm:gap-10 items-center"
          )}
        >
          <nav
            className={clsx(
              "flex-row hidden",
              theme === "editor"
                ? "text-sm pl-2 pt-4 h-sm:hidden sm:flex"
                : "xl:flex justify-center items-center text-2xl 2xl:text-3xl gap-6 sm:gap-10"
            )}
          >
            <div
              className={clsx(
                theme !== "editor" &&
                  "flex flex-row justify-center items-center gap-6 sm:gap-10"
              )}
            >
              <NavLinks
                theme={theme}
                pathname={pathname}
                setMenuOpen={setMenuOpen}
                setAlreadyEntered={setAlreadyEntered}
                activateWindow={activateWindow}
              />
            </div>

            {theme === "editor" && (
              <>
                <div>
                  <NavLink
                    theme={theme}
                    src="/img/image-editor/icons/botr.png"
                    label="Book of Truth"
                    href="/"
                    pathname={pathname}
                    setMenuOpen={setMenuOpen}
                    setAlreadyEntered={setAlreadyEntered}
                  />
                </div>

                <Link
                  href="https://open.spotify.com/playlist/7FENUSmktg9GKNdNiDj9MN"
                  target="_blank"
                  className="pt-[11rem]"
                >
                  <DesktopShortcut
                    theme={theme}
                    src="/img/image-editor/icons/music.png"
                    label="Music"
                    size={48}
                  />
                </Link>
              </>
            )}
          </nav>

          <SideButtons
            theme={theme}
            setMenuOpen={setMenuOpen}
            menuOpen={menuOpen}
          />
        </div>
      </div>

      <SideBar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setAlreadyEntered={setAlreadyEntered}
        theme={theme}
        pathname={pathname}
      />
    </>
  );
};

export default Navbar;