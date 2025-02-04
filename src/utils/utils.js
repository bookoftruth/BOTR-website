import MyComputer from "@/components/pages/image-editor/Windows/MyComputer";
import Paint from "@/components/pages/image-editor/Windows/Paint/Paint";
import RecycleBin from "@/components/pages/image-editor/Windows/RecycleBin";

export const ADDRESS = '73242b77KLvkkUNRQRT3CYNbNFq28dFoy8F2tF6apump';

export const socialLinks = [
  {
    href: 'https://x.com/bookoftruth_/',
    icon: '/img/socials/x.png',
    iconEditor: "/img/image-editor/icons/x.png",
    alt: 'X',
  },
  {
    href: 'https://t.me/bookoftruthcto',
    icon: '/img/socials/telegram.png',
    iconEditor: "/img/image-editor/icons/telegram.png",
    alt: 'Telegram',
  },
  {
    href: 'https://github.com/bookoftruth/',
    icon: '/img/socials/github.svg',
    iconEditor: "/img/image-editor/icons/github.png",
    alt: 'GitHub',
  },
  {
    href: 'https://bookoftruth.gitbook.io/',
    icon: '/img/socials/gitbook.svg',
    iconEditor: "/img/image-editor/icons/gitbook.png",
    alt: 'GitBook',
  },
  {
    href: 'https://www.tiktok.com/@book_of_truth_',
    icon: '/img/socials/tiktok.svg',
    iconEditor: "/img/image-editor/icons/tiktok.png",
    alt: 'TikTok',
  },
  {
    href: 'https://dexscreener.com/solana/9cnj6rr7chvtertvnfbyckqnkfwnrpbi7djznybdv5pz',
    icon: '/img/socials/dexscreener.png',
    iconEditor: "/img/image-editor/icons/dexscreener.png",
    alt: 'DEX',
  },
];

export const navLinks = [
  { href: "/", label: "Book of Truth", src: "/img/image-editor/icons/botr.png" },
  {
    href: "/roadmap",
    label: "Roadmap",
    src: "/img/image-editor/icons/roadmap.png",
  },
  {
    href: "/image-editor",
    label: "Image Editor",
    src: "/img/image-editor/icons/paint.png",
  },
  {
    href: "/reader",
    label: "The Reader",
    src: "/img/image-editor/icons/reader.png",
  },
  {
    href: "/store",
    label: "Merch Store",
    src: "/img/image-editor/icons/merch.png",
  },
];

export const windowsConfig = [
  {
    zIndex: 20,
    openingOrder: 1,
    fullScreen: false,
    closed: false,
    hidden: false,
    active: true,
    title: "untitled - Paint",
    icon: "/img/image-editor/icons/paint.png",
    description: "For Help, click Help Topics on the Help Menu.",
    children: Paint,
    paint: true,
  },
  {
    zIndex: 19,
    openingOrder: 2,
    fullScreen: false,
    closed: true,
    hidden: false,
    active: false,
    title: "Recycle Bin",
    icon: "/img/image-editor/icons/bin.png",
    children: RecycleBin,
  },
  {
    zIndex: 18,
    openingOrder: 3,
    fullScreen: false,
    closed: true,
    hidden: false,
    active: false,
    title: "My Computer",
    icon: "/img/image-editor/icons/system.png",
    children: MyComputer,
  },
];