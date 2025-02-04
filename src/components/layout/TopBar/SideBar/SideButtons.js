'use client';

import Image from "next/image";
import AudioButton from "../../Audio/AudioButton";

const SideButtons = ({ theme, setMenuOpen, menuOpen }) => {
  if (theme === "editor") return null;

  return (
    <>
      <AudioButton />
      <button onClick={() => setMenuOpen(!menuOpen)} className="xl:hidden">
        <Image src="/img/icons/menu.png" alt="menu" width={48} height={48} />
      </button>
    </>
  );
};

export default SideButtons;