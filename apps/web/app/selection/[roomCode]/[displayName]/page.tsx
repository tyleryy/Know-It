"use client";
import Image from "next/image";
import ChickenStamp from "../../../../assets/ChickenStamp.svg";
import DogStamp from "../../../../assets/DogStamp.svg";
import CatStamp from "../../../../assets/CatStamp.svg";
import PenguinStamp from "../../../../assets/PenguinStamp.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import { navigateToRoomSetting } from "./actions";
import { createClient } from "../../../../utils/supabase/client";

interface PageProps {
  params: any;
}

const NameSelectionPage = ({ params }: PageProps) => {
  const [avatar, setAvatar] = useState("");
  const supabase = createClient();

  const handleClick = async () => {
    // get gameState
    const gameState: any = await supabase
      .from("Games")
      .select("players, room_id, host")
      .eq("room_id", params.roomCode);
    if (gameState.data.length === 0) {
      alert("Room not found");
      return;
    }
    let gameStateData = gameState.data[0];

    // find player item in array and update avatar
    let curr_player = gameStateData.players.find((item: any) => {
      return item.name === params.displayName;
    });

    curr_player.avatar = avatar;

    // update players array in gameState
    const { error } = await supabase
      .from("Games")
      .update({
        players: gameStateData.players,
      })
      .eq("room_id", params.roomCode);
    if (error) {
      alert("Error joining room");
      return;
    }

    navigateToRoomSetting(params.roomCode);
  };

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
        onClick={() => handleClick()}
        disabled={!avatar}
      >
        Continue{" "}
      </button>
    </main>
  );
};

export default NameSelectionPage;
