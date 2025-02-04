"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalState } from "@/utils/GlobalStateContext";
import { navLinks } from '@/utils/utils';
import clsx from "clsx";
import SideButtons from "./SideBar/SideButtons";
import SideBar from "./SideBar/SideBar";
import NavBar from "./NavLinks/NavBar";

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

const TopBar = ({ theme, activateWindow }) => {
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
          <NavBar 
            theme={theme}
            pathname={pathname}
            setMenuOpen={setMenuOpen}
            setAlreadyEntered={setAlreadyEntered}
            activateWindow={activateWindow}
            topBar
          />

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

export default TopBar;