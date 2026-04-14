import type { Metadata } from "next";
import { VT323, Dancing_Script } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy Birthday Maija",
  description: "A special birthday celebration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${vt323.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-black">{children}</body>
    </html>
  );
}
