'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { ADDRESS, socialLinks } from '@/utils/utils';
import Link from 'next/link';

const SocialLinks = ({ theme }) => (
  <div
    className={clsx(
      'flex-row hover:text-gray-200',
      theme === 'editor' ? 'hidden pl-2 h-sm:hidden sm:flex' : 'flex justify-center gap-2 xs:gap-4 md:gap-10'
    )}
  >
    {socialLinks.map(({ href, icon, iconEditor, alt }) => (
      <Link
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'flex items-center',
          theme === 'editor' && 'flex-col-reverse p-2 w-24'
        )}
      >
        <span
          className={clsx(
            theme === 'editor'
              ? 'text-sm px-1 my-1'
              : 'text-3xl hidden sm:block'
          )}
        >
          {alt}
        </span>
        <div
          className={clsx(
            theme !== 'editor' && 'block sm:hidden transition-transform duration-200 hover:scale-110'
          )}
        >
          <Image
            src={theme === 'editor' ? iconEditor : icon}
            alt={alt}
            width={theme === 'editor' ? 48 : 36}
            height={theme === 'editor' ? 48 : 36}
          />
        </div>
      </Link>
    ))}
  </div>
);

const BaseTemplate = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center justify-center mt-4 gap-2">
      <p className="text-center select-text xs:text-xl sm:text-2xl">{ADDRESS}</p>
      <button
        onClick={handleCopy}
        className={clsx(
          'p-1 bg-white shadow-md border border-black hover:bg-gray-200 rounded-lg transition-colors flex items-center',
          copied ? 'bg-[#899499]' : 'hover:bg-gray-200'
        )}
      >
        <Image
          src={copied ? '/img/icons/copy-filled.svg' : '/img/icons/copy.svg'}
          alt={copied ? 'Copied' : 'Copy'}
          width={16}
          height={16}
        />
      </button>
    </div>
  );
};

const Footer = ({ theme }) => (
  <>
    <div
      className={clsx(
        "fixed flex flex-col z-10 justify-center w-full text-white",
        theme === "editor"
          ? "bottom-10 gap-2 font-windows"
          : "h-24 bottom-0 items-center sm:gap-1 text-shadow-black",
        (theme === "roadmap" || theme === "soon") &&
          "backdrop-blur bg-black/30 shadow-lg"
      )}
    >
      <SocialLinks theme={theme} />
      {theme !== "editor" && <BaseTemplate />}
    </div>
  </>
);

export default Footer;