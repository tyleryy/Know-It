"use client";

import dog from "../../../assets/avatars/dog.svg";
import frog from "../../../assets/avatars/frog.svg";
import penguin from "../../../assets/avatars/penguin.svg";
import chicken from "../../../assets/avatars/chicken.svg";
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

const sortedUsers = FAKEUSERS.sort((a, b) => b.points - a.points);

export default async function Leaderboard() {
  const leaderboardResult = sortedUsers.map((user, index) => (
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
        <span className="font-medium">{user.username}</span>
      </div>
      <span className="text-lg font-semibold">{user.points}</span>
    </div>
  ));

  return (
    <div className="flex flex-col w-2/12 h-full bg-[#141C2F] rounded-lg text-white">
      <h1 className="text-center text-xl font-bold py-4">Leaderboard</h1>
      <div className="flex flex-col gap-5 px-2">{leaderboardResult}</div>
    </div>
  );
}
