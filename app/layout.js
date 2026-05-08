import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "skillmaxxing.io",
  description: "Maximize your skill stats in real life",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
