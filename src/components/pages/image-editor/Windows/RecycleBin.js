'use client';

import Image from "next/image";
import Link from "next/link";

const RecycleBin = () => {
  return (
    <Link
      href="https://pump.fun/coin/73242b77KLvkkUNRQRT3CYNbNFq28dFoy8F2tF6apump"
      target="_blank"
      className="flex flex-col justify-center p-2 items-center absolute"
    >
      <Image
        src="/img/image-editor/icons/pumpfun.png"
        alt="pumpfun"
        width={48}
        height={48}
      />
      <div className="mt-1 whitespace-nowrap text-white">pump.fun</div>
    </Link>
  );
};

export default RecycleBin;