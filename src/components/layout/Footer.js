'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import AudioButton from './AudioButton';
import { ADDRESS, socialLinks } from '@/context/constants';
import Link from 'next/link';

const SocialLinks = ({ theme }) => (
  <div
    className={clsx(
      'flex flex-row hover:text-gray-200',
      theme === 'editor' ? 'pl-2 h-sm:hidden' : 'justify-center gap-2 xs:gap-4 md:gap-10'
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
              ? 'text-sm bg-[#008682] px-1 my-1'
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

const EditorTemplate = ({ theme }) => {
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex bg-windows-primary pl-2 w-full h-10 items-center">
        <button
          ref={(el) => (startRefs.current[1] = el)}
          onClick={() => setStartOpen(!startOpen)}
        >
          <Image
            src="/img/pfp-editor/icons/start.png"
            alt="Start"
            width={111}
            height={43}
            className="h-8 w-auto"
          />
        </button>

        <div className="flex flex-row gap-2 items-center ml-auto pr-2">
          <AudioButton theme={theme} />
          <div className="relative flex items-center justify-center">
            <Image
              src="/img/pfp-editor/icons/time.png"
              alt="Time"
              width={1266}
              height={43}
              className="h-8 w-auto"
            />
            <div className="absolute top-1 text-center text-xl text-black">
              {currentTime}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={(el) => (startRefs.current[0] = el)}
        className={clsx(
          'fixed bg-windows-primary z-50 h-2/3 w-1/3 bottom-10 left-0 border-b',
          startOpen ? 'block' : 'hidden'
        )}
      />
    </>
  );
};

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
        "fixed flex flex-col z-20 justify-center w-full text-white",
        theme === "editor"
          ? "bottom-0 gap-2 font-windows"
          : "h-24 bottom-0 items-center sm:gap-1 text-shadow-black",
        (theme === "roadmap" || theme === "soon") &&
          "backdrop-blur bg-black/30 shadow-lg"
      )}
    >
      <SocialLinks theme={theme} />
      {theme === "editor" ? <EditorTemplate theme={theme} /> : <BaseTemplate />}
    </div>
  </>
);

export default Footer;