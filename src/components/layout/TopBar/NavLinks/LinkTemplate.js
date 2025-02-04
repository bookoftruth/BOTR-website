'use client';

import clsx from "clsx";
import Image from "next/image";

const LinkTemplate = ({ theme, src, label, size }) => (
  <>
    {theme === "editor" && (
      <Image src={src} alt={label} width={size} height={size} />
    )}
    <div className={clsx(theme === "editor" && "mt-1 whitespace-nowrap")}>
      {label}
    </div>
  </>
);

export default LinkTemplate;