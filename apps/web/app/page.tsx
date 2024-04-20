import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import { Button } from "@repo/ui/button";

export default function Page(): JSX.Element {
  return (
    <main>
      <h1 className="text-3xl font-bold underline text-red-700">
        Hello world!
      </h1>
      <button className="btn btn-secondary">Secondary</button>
    </main>
  );
}
