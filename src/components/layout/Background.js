import Image from "next/image";

const VideoTemplate = ({ src }) => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
    >
      <source src={src} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};

const ImageTemplate = ({ src }) => {
    return (
      <div className="absolute top-0 left-0 w-screen h-screen">
        <Image
          src={src}
          alt="Image Background"
          fill
          unoptimized
          className="pointer-events-none object-cover"
        />
      </div>
    );
};

const getBackgroundSrc = (theme) => {
    switch (theme) {
      case "roadmap":
        return "/img/roadmap/roadmap_background.png";
      case "soon":
        return "/videos/background_soon.webm";
      case "editor":
        const randomNumber = Math.floor(Math.random() * 26) + 1;
        return `/videos/pfp-editor/backgrounds/${randomNumber}.webm`;
      default:
        return "/videos/background.webm";
    }
  };

const Background = ({ theme }) => {
  const src = getBackgroundSrc(theme);

  if (theme === "soon" || theme === "editor" || !theme) {
    return <VideoTemplate src={src} />;
  } else {
    return <ImageTemplate src={src} />;
  }
};

export default Background;