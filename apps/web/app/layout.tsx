import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import Loading from "./loading";

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
    <html lang="en" className="bg-purple-200 text-black">
      <Suspense fallback={<Loading/>}>
      <body className={twMerge(nunito.className)}>{children}</body>
      </Suspense>
    </html>
  );
}
