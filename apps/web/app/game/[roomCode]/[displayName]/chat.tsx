"use client";
import dog from "../../../../assets/avatars/dog.svg";
import frog from "../../../../assets/avatars/frog.svg";
import penguin from "../../../../assets/avatars/penguin.svg";
import chicken from "../../../../assets/avatars/chicken.svg";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl ?? "", supabaseKey ?? "");

export default function Chat({
  roomCode,
  displayName,
}: {
  roomCode: string;
  displayName: string;
}) {
  const [gameData, setGameData] = useState<any>([]);
  const [chats, setChats] = useState<any>([]);
  const [inputMessage, setInputMessage] = useState(""); // State to manage the input field

  useEffect(() => {
    getGameData();
    const mySubscription = supabase
      .channel(roomCode)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Games" },
        (payload) => {
          setGameData(payload.new);
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    // return () => {
    //   supabase.removeSubscription(mySubscription);
    // };
  }, []);

  async function getGameData() {
    const { data } = await supabase
      .from("Games")
      .select("*")
      .eq("room_id", roomCode);
    if (data && data.length > 0) {
      setGameData(data[0]);
      setChats(data[0].chat);
    }
  }

  async function onSend() {
    if (inputMessage.trim()) {
      const updatedChats = [
        ...chats,
        {
          id: chats.length + 1,
          message: inputMessage,
          name: displayName,
          avatar: "chicken",
        },
      ];
      await supabase
        .from("Games")
        .update({ chat: updatedChats })
        .eq("room_id", roomCode);
      setChats(updatedChats);
      setInputMessage(""); // Clear the input field after sending
    }
  }

  const avatarMap: { [key: string]: any } = {
    dog: dog,
    frog: frog,
    penguin: penguin,
    chicken: chicken,
  };

  return (
    <div className="flex flex-col w-3/12 h-full bg-[#141C2F] rounded-lg p-3">
      <div className="flex flex-col overflow-auto	h-[80%]">
        {chats.map((chat: any) => (
          <div key={chat.id} className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full`">
                <Image
                  alt={`${chat.name} avatar`}
                  src={avatarMap[chat.avatar]}
                  className="w-9 h-9 rounded-full"
                />
              </div>
            </div>
            <div className="chat-header text-[#A6ADBB]">
              {chat.name}
              {/* <time className="text-xs opacity-50">
                {new Date(chat.time).toLocaleTimeString()}
              </time> */}
            </div>
            <div className="chat-bubble text-lg text-white shadow-md">
              {chat.message}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Type here"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs p-3 rounded-xl text-white"
        />
        <button
          className="btn btn-circle bg-[#375287] items-center justify-center"
          onClick={onSend}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.9306 14.255L6.8162 2.43098C6.46094 2.23205 6.05342 2.14629 5.64811 2.18516C5.2428 2.22403 4.859 2.38568 4.54802 2.64851C4.23704 2.91133 4.01368 3.26281 3.9078 3.65598C3.80192 4.04914 3.81855 4.46525 3.95549 4.84871L7.58097 15.0001H17C17.2653 15.0001 17.5196 15.1054 17.7071 15.293C17.8947 15.4805 18 15.7349 18 16.0001C18 16.2653 17.8947 16.5196 17.7071 16.7072C17.5196 16.8947 17.2653 17.0001 17 17.0001H7.58097L3.95549 27.1514C3.84831 27.4532 3.81496 27.7762 3.85825 28.0935C3.90153 28.4108 4.02018 28.7131 4.20427 28.9751C4.38836 29.2372 4.63254 29.4513 4.91636 29.5996C5.20018 29.7478 5.51539 29.826 5.83561 29.8275C6.17925 29.8268 6.51696 29.7379 6.81632 29.5692L27.9305 17.7452C28.2407 17.5715 28.4989 17.3182 28.6787 17.0115C28.8585 16.7047 28.9533 16.3556 28.9533 16.0001C28.9533 15.6446 28.8586 15.2955 28.6788 14.9887C28.499 14.682 28.2408 14.4287 27.9306 14.255Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
