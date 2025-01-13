"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";

const Background = ({ backgroundType }) => {
  if (backgroundType === "dynamic") {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none z-0"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else {
    return (
      <Image
        src="/img/roadmap_background.png"
        alt="Static Background"
        layout="fill"
        objectFit="cover"
        className="pointer-events-none z-0"
      />
    );
  }
};

const Layout = ({ children, backgroundType }) => {
  return (
    <>
      <Navbar backgroundType={backgroundType} />
      <Background backgroundType={backgroundType} />
      <main className="relative z-10">{children}</main>
      <Footer backgroundType={backgroundType}/>
    </>
  );
}

export default Layout;