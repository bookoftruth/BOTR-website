"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";

const Background = ({ backgroundType }) => {
  if (backgroundType === "soon" || !backgroundType) {
    const src = (backgroundType === "soon") ? "/videos/background_soon.mp4" : "/videos/background.mp4";
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none z-0"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else {
    let src;
    if (backgroundType === "roadmap") {
      src="/img/roadmap/roadmap_background.png";
    } else {
      const randomNumber = Math.floor(Math.random() * 16) + 1;
      const fileExtension = randomNumber === 5 || randomNumber === 11 ? "jpg" : "gif";
      src = `/img/pfp-editor/backgrounds/${randomNumber}.${fileExtension}`;
    }
    return (
      <div className="absolute top-0 left-0 w-screen h-screen z-0">
        <Image
          src={src}
          alt="Static Background"
          layout="fill"
          objectFit="cover"
          className="pointer-events-none z-0"
        />
      </div>
    );
  }
};

const Layout = ({ children, backgroundType }) => {
  return (
    <>
      <Navbar backgroundType={backgroundType} />
      <Footer backgroundType={backgroundType}/>
      <Background backgroundType={backgroundType} />
      <main className="relative z-10">{children}</main>
    </>
  );
}

export default Layout;