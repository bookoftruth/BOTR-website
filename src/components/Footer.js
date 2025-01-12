'use client';

import { useState, useEffect } from 'react';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const ADDRESS = '73242b77KLvkkUNRQRT3CYNbNFq28dFoy8F2tF6apump';

  const handleCopy = () => {
    navigator.clipboard.writeText(ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed bottom-2 flex flex-col gap-1 w-full z-20 text-white text-shadow-black">
      <div className="flex-row justify-center gap-4 text-3xl  hidden sm:flex">
        <a href="https://x.com/bookoftruth_/" target="blank">
          X
        </a>
        <a href="https://t.me/bookoftruthcto" target="blank">
          Telegram
        </a>
        <a
          href="https://github.com/bookoftruth/Book_of_truth"
          target="blank"
        >
          GitHub
        </a>
        <a
          href="https://bookoftruth.gitbook.io/"
          target="blank"
        >
          GitBook
        </a>
        <a
          href="https://www.tiktok.com/@book_of_truth_"
          target="blank"
        >
          TikTok
        </a>
        <a
          href="https://dexscreener.com/solana/9cnj6rr7chvtertvnfbyckqnkfwnrpbi7djznybdv5pz"
          target="blank"
        >
          DEX
        </a>
      </div>

      <div className="flex flex-row justify-center gap-2 sm:hidden">
        <a href="https://x.com/bookoftruth_/" target="blank">
          <img
            src="/img/icons/x.png"
            alt="x-icon"
            className="w-12 h-12 transition-transform duration-200 hover:scale-110"
          />
        </a>
        <a href="https://t.me/bookoftruthcto" target="blank">
          <img
            src="/img/icons/telegram.png"
            alt="telegram-icon"
            className="w-12 h-12 transition-transform duration-200 hover:scale-110"
          />
        </a>
        <a
          href="https://github.com/bookoftruth/Book_of_truth"
          target="blank"
        >
          <img
            src="/img/icons/github.svg"
            alt="github-icon"
            className="w-12 h-12 transition-transform duration-200 hover:scale-110"
          />
        </a>
        <a
          href="https://bookoftruth.gitbook.io/"
          target="blank"
        >
          <img
            src="/img/icons/gitbook.svg"
            alt="gitbook-icon"
            className="w-12 h-12 transition-transform duration-200 hover:scale-110"
          />
        </a>
        <a
          href="https://www.tiktok.com/@book_of_truth_"
          target="blank"
        >
          <img
            src="/img/icons/tiktok.svg"
            alt="github-icon"
            className="w-12 h-12 transition-transform duration-200 hover:scale-110"
          />
        </a>
        <a
          href="https://dexscreener.com/solana/9cnj6rr7chvtertvnfbyckqnkfwnrpbi7djznybdv5pz"
          target="blank"
        >
          <img
            src="/img/icons/dexscreener.png"
            alt="dexscreener-icon"
            className="w-12 h-12 transition-transform duration-200 hover:scale-110"
          />
        </a>
      </div>

      <div className="flex flex-row justify-center items-center gap-2">
        <p className="text-center xs:text-xl sm:text-2xl">{ADDRESS}</p>
        <button
          onClick={handleCopy}
          className={`p-1 bg-white rounded-lg transition-colors flex items-center border border-black ${copied ? "bg-[#899499]" : "hover:bg-gray-200"}`}
        >
          {copied ? (
            <img
              src="/img/icons/copy-filled.svg"
              alt="Copied"
              className="w-6 h-6"
            />
          ) : (
            <img src="/img/icons/copy.svg" alt="Copy" className="w-4 h-4 sm:w-6 sm:h-6 " />
          )}
        </button>
      </div>
    </div>
  );
};

export default Footer;