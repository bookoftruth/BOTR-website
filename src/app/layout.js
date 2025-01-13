import AudioPlayer from "@/components/layout/AudioPlayer";
import "./globals.css";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import PageTransition from "@/components/layout/PageTransition";

export const metadata = {
  title: "📖  𝔅𝔬𝔬𝔨 𝔬𝔣 𝔗𝔯𝔲𝔱𝔥  📖",
  description: "Will you ever find it ?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalStateProvider>
          <div className="fixed h-screen w-screen overflow-hidden font-terminal">
            <AudioPlayer />
            <PageTransition>{children}</PageTransition>
          </div>
        </GlobalStateProvider>
      </body>
    </html>
  );
}