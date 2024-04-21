"use client";
import React from "react";
import Whiteboard from "../../src";
import { Providers } from "../providers";
export default async function Home() {
  // const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;
  return (
    <main>
      <Providers>
        <Whiteboard />
      </Providers>
    </main>
  );
}

// export async function getStaticProps() {
//   const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

//   if (!API_KEY) {
//     console.warn("missing api key");
//   }

//   return { props: {} };
// }
