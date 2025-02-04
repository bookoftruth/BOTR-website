'use client';

import LinkTemplate from "@/components/layout/TopBar/NavLinks/LinkTemplate";
import clsx from "clsx";

const DesktopShortcut = ({
  theme,
  src,
  label,
  size,
  activateWindow,
  bottomBar = false,
}) => (
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
    className={clsx(
      "flex p-2 items-center",
      bottomBar
        ? "flex-row gap-2 w-full text-lg hover:text-white hover:bg-windows-tertiary"
        : "flex-col justify-center w-24"
    )}
  >
    <LinkTemplate theme={theme} src={src} label={label} size={bottomBar ? 32 : size} />
  </button>
);

export default DesktopShortcut;