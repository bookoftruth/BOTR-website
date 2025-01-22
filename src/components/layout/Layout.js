"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";

const BaseTemplate = ({ theme }) => {
  const src = (theme === "soon") ? "/videos/background_soon.mp4" : "/videos/background.mp4";
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

const ImageTemplate = ({ theme }) => {
  const src = theme === "roadmap"
    ? "/img/roadmap/roadmap_background.png"
    : (() => {
        const randomNumber = Math.floor(Math.random() * 28) + 1;
        return `/img/pfp-editor/backgrounds/${randomNumber}.${randomNumber === 11 ? "jpg" : "gif"}`;
      })();

    return (
      <div className="absolute top-0 left-0 w-screen h-screen">
        <Image
          src={src}
          alt="Static Background"
          fill
          className="pointer-events-none object-cover"
        />
      </div>
    );
};

const Background = ({ theme }) => {
  if (theme === "soon" || !theme) {
    return <BaseTemplate theme={theme} />;
  } else if (theme === "roadmap") {
    return <ImageTemplate theme={theme} />;
  } else {
    return <ImageTemplate />;
  }
};

const Layout = ({ children, theme }) => {
  return (
    <>
      <Navbar theme={theme} />
      <Footer theme={theme}/>
      <Background theme={theme} />
      <main className="relative">{children}</main>
    </>
  );
}

export default Layout;