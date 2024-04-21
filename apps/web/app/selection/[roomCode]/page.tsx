"use client";
import Image from "next/image";

interface PageProps {
  params: any; 
}

const NameSelectionPage = ({ params }: PageProps) => {
  return (
    <main className="flex justify-center items-center bg-primary w-screen h-screen bg-purple-200">
      <h1 className="text-7xl	font-bold">Pick Your Avatar!</h1>
      <div>

      </div>
    </main>
  );
};

export default NameSelectionPage;
