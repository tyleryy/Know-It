"use client";
import Image from "next/image";
import ChickenStamp from "../../../assets/ChickenStamp.svg";
import DogStamp from "../../../assets/DogStamp.svg";
import CatStamp from "../../../assets/CatStamp.svg";
import PenguinStamp from "../../../assets/PenguinStamp.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import { navigateToRoomSetting } from "./actions";

interface PageProps {
  params: any;
}

const NameSelectionPage = ({ params }: PageProps) => {
  const [avatar, setAvatar] = useState("");

  return (
    <main className="flex justify-center items-center flex-col w-screen h-screen">
      <h1 className="text-7xl	font-bold">Pick Your Avatar!</h1>
      <div className="flex gap-8 pt-10 h-52">
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.2 }}
          onClick={() => setAvatar("chicken")}
        >
          <Image
            src={ChickenStamp}
            alt="chicken-stamp"
            width={125}
            height={100}
          />
        </motion.div>
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.2 }}
          onClick={() => setAvatar("dog")}
        >
          <Image src={DogStamp} alt="dog-stamp" width={125} height={100} />
        </motion.div>
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.2 }}
          onClick={() => setAvatar("cat")}
        >
          <Image src={CatStamp} alt="cat-stamp" width={125} height={100} />
        </motion.div>
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.2 }}
          onClick={() => setAvatar("penguin")}
        >
          <Image
            src={PenguinStamp}
            alt="penguin-stamp"
            width={125}
            height={100}
          />
        </motion.div>
      </div>
      <button
        className="btn btn-success mt-10"
        onClick={() => navigateToRoomSetting(params.roomCode)}
        disabled={!avatar}
      >
        Continue{" "}
      </button>
    </main>
  );
};

export default NameSelectionPage;
