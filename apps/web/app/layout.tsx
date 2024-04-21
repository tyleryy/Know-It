import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { twMerge } from "tailwind-merge";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Know-It!",
  description: "Study Group Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="bg-[#19263F] text-black">
      <body className={twMerge(nunito.className)}>{children}</body>
    </html>
  );
}
