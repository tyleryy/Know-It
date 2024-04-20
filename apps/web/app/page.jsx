"use client";
// TODO make this not a client component
import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import { Button } from "@repo/ui/button";

import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

export default function Page() {
  // TODO add these env vars to prod
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function test() {
      const { data: users } = await supabase.from("Users").select("*");
      console.log(users);
    }
    test();
  });

  // const { data: users } = await supabase.from("Users").select("*");

  return (
    <main>
      <h1 className="text-3xl font-bold underline text-red-700">
        Hello world!
      </h1>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-outline btn-primary ">Primary</button>
    </main>
  );
}
