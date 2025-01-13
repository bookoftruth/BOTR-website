import "./globals.css";
import { GlobalStateProvider } from "@/context/GlobalStateContext";

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
            {children}
          </div>
        </GlobalStateProvider>
      </body>
    </html>
  );
}