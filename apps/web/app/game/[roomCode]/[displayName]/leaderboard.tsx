"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl ?? "", supabaseKey ?? "");

import dog from "../../../../assets/avatars/dog.svg";
import frog from "../../../../assets/avatars/frog.svg";
import penguin from "../../../../assets/avatars/penguin.svg";
import chicken from "../../../../assets/avatars/chicken.svg";
import Image from "next/image";

const FAKEUSERS = [
  {
    username: "GreenHopper",
    avatar: "frog",
    points: 12,
  },
  {
    username: "BarkRanger",
    avatar: "dog",
    points: 13,
  },
  {
    username: "IceWaddler",
    avatar: "penguin",
    points: 15,
  },
  {
    username: "FeatherFan",
    avatar: "chicken",
    points: 11,
  },
];

const avatarMap: { [key: string]: any } = {
  dog: dog,
  frog: frog,
  penguin: penguin,
  chicken: chicken,
};

// const sortedUsers = FAKEUSERS.sort((a, b) => b.points - a.points);

export default async function Leaderboard({ roomCode }: { roomCode: string }) {
  const [gameData, setGameData] = useState<any>([]);
  const [sortedUsers, setSortedUsers] = useState<any>([]);

  useEffect(() => {
    if (gameData.length === 0) return;
    setSortedUsers(
      gameData.players.sort((a: any, b: any) => b.score - a.score)
    );
  }, [gameData]);

  console.log(gameData);
  async function getGameData() {
    const { data } = await supabase
      .from("Games")
      .select("*")
      .eq("room_id", roomCode);
    if (data && data.length > 0) {
      setGameData(data[0]);
    }
  }

  //0YPEM

  // Create a function to handle inserts
  const handleUpdates = (payload: any) => {
    // setGameData((prev: any) => {
    //   payload.new;
    // });
    setGameData(payload.new);
  };

  // Listen to inserts
  supabase
    .channel(roomCode)
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "Games" },
      handleUpdates
    )
    .subscribe();

  useEffect(() => {
    getGameData();
  }, []);
  const leaderboardResult = sortedUsers.map((user: any, index: any) => (
    <div
      key={index}
      className="flex items-center justify-between px-4 py-2 rounded-lg bg-[linear-gradient(145deg,_#202c3f,_#1b2535)]"
    >
      <div className="flex items-center space-x-2">
        <Image
          className="w-9 h-9 rounded-full"
          src={avatarMap[user.avatar]}
          alt={user.avatar}
        />
        <span className="font-medium">{user.name}</span>
      </div>
      <span className="text-lg font-semibold">{user.score}</span>
    </div>
  ));

  return (
    <div className="flex flex-col w-2/12 h-full bg-[#141C2F] rounded-lg text-white">
      <h1 className="text-center text-xl font-bold py-4">Leaderboard</h1>
      <div className="flex flex-col gap-5 px-2">{leaderboardResult}</div>
    </div>
  );
}
