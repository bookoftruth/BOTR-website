'use client';

import clsx from "clsx";
import NavLinks from "./NavLinks";
import NavLink from "./NavLink";
import Link from "next/link";
import DesktopShortcut from "@/components/pages/image-editor/DesktopShortcut";

const NavBar = ({
  theme,
  pathname,
  setMenuOpen,
  setAlreadyEntered,
  activateWindow,
  bottomBar = false,
}) => (
  <nav
    className={clsx(
      theme === "editor"
        ? bottomBar
          ? "flex-col"
          : "flex-row hidden text-sm pl-2 pt-4 h-sm:hidden sm:flex"
        : "hidden xl:flex justify-center items-center text-2xl 2xl:text-3xl gap-6 sm:gap-10"
    )}
  >
    <div
      className={clsx(
        theme !== "editor" &&
          "flex flex-row justify-center items-center gap-6 sm:gap-10",
      )}
    >
      <NavLinks
        theme={theme}
        pathname={pathname}
        setMenuOpen={setMenuOpen}
        setAlreadyEntered={setAlreadyEntered}
        activateWindow={activateWindow}
        bottomBar={bottomBar}
      />
    </div>

    {theme === "editor" && (
      <div className={clsx("flex", bottomBar ? "flex-col" : "flex-row")}>
        <div>
          <NavLink
            theme={theme}
            src="/img/image-editor/icons/botr.png"
            label="Book of Truth"
            href="/"
            pathname={pathname}
            setMenuOpen={setMenuOpen}
            setAlreadyEntered={setAlreadyEntered}
            bottomBar={bottomBar}
          />
        </div>

        <Link
          href="https://open.spotify.com/playlist/7FENUSmktg9GKNdNiDj9MN"
          target="_blank"
          className={clsx(!bottomBar && "pt-[11rem]")}
        >
          <DesktopShortcut
            theme={theme}
            src="/img/image-editor/icons/music.png"
            label="Music"
            size={48}
            bottomBar={bottomBar}
          />
        </Link>
      </div>
    )}
  </nav>
);

export default NavBar;