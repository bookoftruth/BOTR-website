import "./globals.css";

export const metadata = {
  title: "📖  𝔅𝔬𝔬𝔨 𝔬𝔣 𝔗𝔯𝔲𝔱𝔥  📖",
  description: "Will you ever find it ?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}