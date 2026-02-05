import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web3 QA Learning Hub",
  description:
    "Learn blockchain testing and Web3 quality assurance through interactive modules and hands-on exercises",
  keywords: [
    "web3",
    "blockchain",
    "QA",
    "testing",
    "smart contracts",
    "ethereum",
    "learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
