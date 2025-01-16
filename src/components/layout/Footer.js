'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AudioButton from './AudioButton';

const ADDRESS = '73242b77KLvkkUNRQRT3CYNbNFq28dFoy8F2tF6apump';

const socialLinks = [
  {
    href: 'https://x.com/bookoftruth_/',
    icon: '/img/socials/x.png',
    iconEditor: "/img/pfp-editor/icons/x.png",
    alt: 'X',
  },
  {
    href: 'https://t.me/bookoftruthcto',
    icon: '/img/socials/telegram.png',
    iconEditor: "/img/pfp-editor/icons/telegram.png",
    alt: 'Telegram',
  },
  {
    href: 'https://github.com/bookoftruth/Book_of_truth',
    icon: '/img/socials/github.svg',
    iconEditor: "/img/pfp-editor/icons/github.png",
    alt: 'GitHub',
  },
  {
    href: 'https://bookoftruth.gitbook.io/',
    icon: '/img/socials/gitbook.svg',
    iconEditor: "/img/pfp-editor/icons/gitbook.png",
    alt: 'GitBook',
  },
  {
    href: 'https://www.tiktok.com/@book_of_truth_',
    icon: '/img/socials/tiktok.svg',
    iconEditor: "/img/pfp-editor/icons/tiktok.png",
    alt: 'TikTok',
  },
  {
    href: 'https://dexscreener.com/solana/9cnj6rr7chvtertvnfbyckqnkfwnrpbi7djznybdv5pz',
    icon: '/img/socials/dexscreener.png',
    iconEditor: "/img/pfp-editor/icons/dexscreener.png",
    alt: 'DEX',
  },
];

const SocialLink = ({ backgroundType, href, icon, iconEditor, alt }) => (
  <a href={href} target="blank" className={`flex items-center ${
    backgroundType === "editor"
      ? "flex-col-reverse"
      : ""
  }`}>
      <span className={`${
              backgroundType === "editor"
                ? "text-sm bg-[#008682] px-1 my-1"
                : "text-3xl hidden sm:block"
            }`}>{alt}</span>

      <div className={` ${
              backgroundType === "editor"
                ? ""
                : "block sm:hidden transition-transform duration-200 hover:scale-110"
            }`}>
        <Image src={backgroundType === "editor" ? iconEditor : icon} alt={alt} width={48} height={48} />
      </div>
  </a>
);

const Footer = ({ backgroundType }) => {
  const [copied, setCopied] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const startRefs = useRef([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours} : ${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (startRefs.current.every(ref => ref && !ref.contains(event.target))) {
        setStartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {backgroundType === "editor" ? (
        <div className="font-windows">
          <div className="fixed bottom-0 flex flex-col gap-2 justify-center w-full z-20 text-white">
            <div className="flex flex-row pl-6 gap-6 hover:text-gray-200">
              {socialLinks.map(({ href, icon, iconEditor, alt }) => (
                <SocialLink
                  backgroundType={"editor"}
                  key={href}
                  href={href}
                  icon={icon}
                  iconEditor={iconEditor}
                  alt={alt}
                />
              ))}
            </div>

            <div className="flex bg-[#C0BFBD] pl-2 w-full h-8 items-center border border-black">
              <button ref={el => startRefs.current[1] = el} onClick={() => setStartOpen(!startOpen)}>
                <Image
                  src="/img/pfp-editor/icons/start.png"
                  alt="Start"
                  width={111}
                  height={43}
                  className="h-6 w-auto"
                />
              </button>

              <div className="flex flex-row gap-2 items-center ml-auto pr-2">
                <AudioButton backgroundType={backgroundType} />
                <div className="relative flex items-center justify-center">
                  <Image
                    src="/img/pfp-editor/icons/time.png"
                    alt="Time"
                    width={1266}
                    height={43}
                    className="h-6 w-auto"
                  />
                  <div className="absolute text-center text-black">
                    {currentTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`fixed h-24 bottom-0 flex flex-col justify-center items-center sm:gap-1 w-full z-20 text-white text-shadow-black ${
              backgroundType === "roadmap" || backgroundType === "soon"
                ? "backdrop-blur bg-black/30 shadow-lg"
                : ""
            }`}
          >
            <div className="flex flex-row justify-center gap-2 xs:gap-4 md:gap-10 hover:text-gray-200">
              {socialLinks.map(({ href, icon, iconEditor, alt }) => (
                <SocialLink
                  backgroundType={backgroundType}
                  key={href}
                  href={href}
                  icon={icon}
                  iconEditor={iconEditor}
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
                  src={
                    copied
                      ? "/img/icons/copy-filled.svg"
                      : "/img/icons/copy.svg"
                  }
                  alt={copied ? "Copied" : "Copy"}
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </>
      )}

      <div
        ref={el => startRefs.current[0] = el}
        className={`fixed bg-[#C0BFBD] z-20 h-2/3 w-1/3 bottom-8 left-0 ${startOpen ? "block" : "hidden"}`}
      ></div>
    </>
  );
};

export default Footer;