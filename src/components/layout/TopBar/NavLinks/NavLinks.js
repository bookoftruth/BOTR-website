'use client';

import DesktopShortcut from "@/components/pages/image-editor/DesktopShortcut";
import NavLink from "./NavLink";
import { navLinks } from "@/utils/utils";

const NavLinks = ({
  theme,
  pathname,
  setMenuOpen,
  setAlreadyEntered,
  isMobile,
  activateWindow,
  bottomBar = false,
}) => (
  <>
    {theme === "editor" && (
      <DesktopShortcut
        theme={theme}
        src="/img/image-editor/icons/system.png"
        label="My Computer"
        size={48}
        activateWindow={activateWindow}
        bottomBar={bottomBar}
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
            bottomBar={bottomBar}
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
            bottomBar={bottomBar}
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
        bottomBar={bottomBar}
      />
    )}
  </>
);

  export default NavLinks;