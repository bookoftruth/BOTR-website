'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { socialLinks } from '@/utils/utils';
import Link from 'next/link';

const SocialLinks = ({ theme, bottomBar = false }) => (
  <div
    className={clsx(
      "flex flex-row",
      theme === "editor"
        ? bottomBar
          ? "flex-col"
          : "hidden pl-2 h-sm:hidden sm:flex"
        : "justify-center gap-2 xs:gap-4 md:gap-10"
    )}
  >
    {socialLinks.map(({ href, icon, iconEditor, alt }) => (
      <div
        key={href}
        className={clsx(
          bottomBar &&
            "flex flex-col w-full p-2 hover:bg-windows-tertiary hover:text-white"
        )}
      >
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "flex items-center hover:text-gray-200",
            theme === "editor"
              ? bottomBar
                ? "flex-row-reverse gap-2 w-fit"
                : "flex-col-reverse p-2 w-24"
              : ""
          )}
        >
          <span
            className={clsx(
              theme === "editor"
                ? bottomBar
                  ? "text-lg"
                  : "text-sm px-1 my-1"
                : "text-3xl hidden sm:block"
            )}
          >
            {alt}
          </span>
          <div
            className={clsx(
              theme !== "editor" &&
                "block sm:hidden transition-transform duration-200 hover:scale-110"
            )}
          >
            <Image
              src={theme === "editor" ? iconEditor : icon}
              alt={alt}
              width={theme === "editor" ? (bottomBar ? 32 : 48) : 36}
              height={theme === "editor" ? (bottomBar ? 32 : 48) : 36}
            />
          </div>
        </Link>
      </div>
    ))}
  </div>
);

export default SocialLinks;