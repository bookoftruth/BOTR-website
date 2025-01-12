'use client';

import { useState } from 'react';
import Image from 'next/image';

const ADDRESS = '73242b77KLvkkUNRQRT3CYNbNFq28dFoy8F2tF6apump';

const socialLinks = [
  {
    href: 'https://x.com/bookoftruth_/',
    icon: '/img/icons/x.png',
    alt: 'X',
  },
  {
    href: 'https://t.me/bookoftruthcto',
    icon: '/img/icons/telegram.png',
    alt: 'Telegram',
  },
  {
    href: 'https://github.com/bookoftruth/Book_of_truth',
    icon: '/img/icons/github.svg',
    alt: 'GitHub',
  },
  {
    href: 'https://bookoftruth.gitbook.io/',
    icon: '/img/icons/gitbook.svg',
    alt: 'GitBook',
  },
  {
    href: 'https://www.tiktok.com/@book_of_truth_',
    icon: '/img/icons/tiktok.svg',
    alt: 'TikTok',
  },
  {
    href: 'https://dexscreener.com/solana/9cnj6rr7chvtertvnfbyckqnkfwnrpbi7djznybdv5pz',
    icon: '/img/icons/dexscreener.png',
    alt: 'DEX',
  },
];

const SocialLink = ({ href, icon, alt }) => (
  <a href={href} target="blank" className="flex items-center">
      <span className="text-3xl hidden sm:block">{alt}</span>

      <div className='block sm:hidden transition-transform duration-200 hover:scale-110'>
        <Image src={icon} alt={alt} width={48} height={48} />
      </div>
  </a>
);

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed bottom-2 flex flex-col gap-1 w-full z-20 text-white text-shadow-black">
      <div className="flex flex-row justify-center gap-2 sm:gap-4">
        {socialLinks.map(({ href, icon, alt }) => (
          <SocialLink
            key={href}
            href={href}
            icon={icon}
            alt={alt}
          />
        ))}
      </div>

      <div className="flex items-center justify-center mt-4 gap-2">
        <p className="text-center xs:text-xl sm:text-2xl">{ADDRESS}</p>
        <button
          onClick={handleCopy}
          className={`p-1 bg-white rounded-lg transition-colors flex items-center border border-black ${
            copied ? "bg-[#899499]" : "hover:bg-gray-200"
          }`}
        >
          <Image
            src={copied ? "/img/icons/copy-filled.svg" : "/img/icons/copy.svg"}
            alt={copied ? "Copied" : "Copy"}
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
};

export default Footer;