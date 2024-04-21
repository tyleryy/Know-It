"use client";
import Image from "next/image";
import ChickenStamp from "../../../assets/ChickenStamp.svg";
import DogStamp from "../../../assets/DogStamp.svg";
import CatStamp from "../../../assets/CatStamp.svg";
import PenguinStamp from "../../../assets/PenguinStamp.svg";
import { useState } from "react";

interface PageProps {
  params: any;
}

const NameSelectionPage = ({ params }: PageProps) => {
  const [isHoverChicken, setIsHoverChicken] = useState(false);
  const [isHoverCat, setIsHoverCat] = useState(false);
  const [isHoverDog, setIsHoverDog] = useState(false);
  const [isHoverPenguin, setIsHoverPenguin] = useState(false);

  return (
    <main className="flex justify-center items-center flex-col bg-primary w-screen h-screen bg-purple-200">
      <h1 className="text-7xl	font-bold">Pick Your Avatar!</h1>
      <div className="flex gap-8 pt-5">
        <div
          className="cursor-pointer"
          onMouseOver={() => setIsHoverChicken(true)}
          onMouseLeave={() => setIsHoverChicken(false)}
        >
          <Image
            src={ChickenStamp}
            alt="chicken-stamp"
            width={isHoverChicken ? 200 : 125}
            height={100}
            style={
              isHoverChicken
                ? { filter: "drop-shadow(0px 15px 4px #ededed)" }
                : undefined
            }
          />
        </div>
        <div
          className="cursor-pointer"
          onMouseOver={() => setIsHoverCat(true)}
          onMouseLeave={() => setIsHoverCat(false)}
        >
          <Image
            src={CatStamp}
            alt="cat-stamp"
            width={isHoverCat ? 200 : 125}
            height={100}
            style={
              isHoverCat
                ? { filter: "drop-shadow(0px 15px 4px #ededed)" }
                : undefined
            }
          />
        </div>
        <div
          className="cursor-pointer"
          onMouseOver={() => setIsHoverDog(true)}
          onMouseLeave={() => setIsHoverDog(false)}
        >
          <Image
            src={DogStamp}
            alt="dog-stamp"
            width={isHoverDog ? 200 : 125}
            height={100}
            style={
              isHoverDog
                ? { filter: "drop-shadow(0px 15px 4px #ededed)" }
                : undefined
            }
          />
        </div>
        <div
          className="cursor-pointer"
          onMouseOver={() => setIsHoverPenguin(true)}
          onMouseLeave={() => setIsHoverPenguin(false)}
        >
          <Image
            src={PenguinStamp}
            alt="penguin-stamp"
            width={isHoverPenguin ? 200 : 125}
            height={100}
            style={
              isHoverPenguin
                ? { filter: "drop-shadow(0px 15px 4px #ededed)" }
                : undefined
            }
          />
        </div>
      </div>
    </main>
  );
};

export default NameSelectionPage;
