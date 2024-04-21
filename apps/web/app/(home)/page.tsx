// import { redirect } from "next/navigation";
// import { createClient } from "../../utils/supabase/server";
"use client";

import JoinModal from "./join";
import CreateModal from "./create";
import { useState } from "react";

export default function Page() {
  const [displayName, setDisplayName] = useState("");

  return (
    <main
      className="flex justify-center items-center w-screen h-screen"
      style={{
        backgroundImage:
          "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('background.webp')",
      }}
    >
      <div className="flex w-auto text-center gap-10 flex-col justify-center items-center">
        <div className="flex flex-col items-center p-8 bg-gradient-to-r from-[#19263F] to-[#495e85] rounded-2xl">
          <h1 className="text-9xl	font-bold text-white">Know-It!</h1>
          <label className="input input-bordered flex items-center gap-2 w-8/12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 text-white"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow text-white"
              placeholder="Username"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
        </div>
        <div className="flex gap-5">
          <JoinModal displayName={displayName} />
          <CreateModal displayName={displayName} />
        </div>
      </div>
    </main>
  );
}
