'use client';

import { useState, useEffect } from 'react';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState('');
  const ADDRESS = '73242b77KLvkkUNRQRT3CYNbNFq28dFoy8F2tF6apump';

  const handleCopy = () => {
    navigator.clipboard.writeText(ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatAddress = (address, width) => {
    const totalLength = address.length;
    const maxChars = Math.floor((width - 200) / 30);
    const charsToShow = Math.min(maxChars, totalLength);
    if (charsToShow < 5) return "BOTR/SOL";
    if (totalLength <= (charsToShow + 5)) return address;

    const start = address.slice(0, Math.ceil(charsToShow / 2));
    const end = address.slice(-Math.floor(charsToShow / 2));
    return `${start}...${end}`;
  };

  useEffect(() => {
    const updateFormattedAddress = () => {
      setFormattedAddress(formatAddress(ADDRESS, window.innerWidth));
    };

    window.addEventListener('resize', updateFormattedAddress);
    updateFormattedAddress();

    return () => {
      window.removeEventListener('resize', updateFormattedAddress);
    };
  }, [ADDRESS]);

  return (
    <div className="fixed w-full h-20 z-20 bottom-0 backdrop-blur bg-white/30 flex items-center justify-center text-white gap-4">
      <p className="text-center text-7xl">{formattedAddress}</p>
      <button
        onClick={handleCopy}
        className={`p-2 bg-white rounded-lg transition-colors flex items-center ${copied ? 'bg-gray-400' : 'hover:bg-gray-200'}`}
      >
        {copied ? (
          <img src="/img/icons/copy-filled.svg" alt="Copied" className="w-8 h-8" />
        ) : (
          <img src="/img/icons/copy.svg" alt="Copy" className="w-8 h-8" />
        )}
      </button>
    </div>
  );
};

export default Footer;