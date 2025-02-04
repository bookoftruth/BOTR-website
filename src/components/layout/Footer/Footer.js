'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { ADDRESS } from '@/utils/utils';
import SocialLinks from './SocialLinks';

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