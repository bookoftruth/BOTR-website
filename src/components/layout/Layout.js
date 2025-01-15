"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";

const Background = ({ backgroundType }) => {
  if (backgroundType === "roadmap") {
    return (
      <div className="absolute top-0 left-0 w-screen h-screen z-0">
        <Image
          src="/img/roadmap/roadmap_background.png"
          alt="Static Background"
          layout="fill"
          objectFit="cover"
          className="pointer-events-none z-0"
        />
      </div>
    );
  } else {
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