import AudioPlayer from "@/components/layout/Audio/AudioPlayer";
import "./globals.css";
import { GlobalStateProvider } from "@/utils/GlobalStateContext";

export const metadata = {
  title: "📖  𝔅𝔬𝔬𝔨 𝔬𝔣 𝔗𝔯𝔲𝔱𝔥  📖",
  description: "Will you ever find it ?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalStateProvider>
          <AudioPlayer />
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}