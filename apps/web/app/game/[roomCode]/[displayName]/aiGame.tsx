"use client";
import Image from "next/image";
import gem from "../../../../assets/gem.png";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl ?? "", supabaseKey ?? "");

const colors = [
  "bg-gradient-to-r to-[#781919] from-[#4B0808]",
  "bg-gradient-to-r to-[#4D6889] from-[#1A3D69]",
  "bg-gradient-to-r to-[#DEA52D] from-[#6F5217]",
  "bg-gradient-to-r to-[#B5A544] from-[#0F921A]",
];

const FAKEDATA = {
  question:
    "If you could spend one year in perfect happiness but afterward would remember nothing of the experience, would you?",
  answers: [
    {
      is_correct: true,
      answer: "Well yes but no, um actually",
      explaination: "",
    },
    {
      is_correct: false,
      answer: "Well yes but no, um actually",
      explaination: "This is because of that",
    },
    {
      is_correct: false,
      answer: "Well yes but no, um actually",
      explaination: "This is because of that",
    },
    {
      is_correct: false,
      answer: "Well yes but no, um actually",
      explaination: "Because I said so",
    },
  ],
};

export default async function AiGame({ roomCode }: { roomCode: string }) {
  const [gameData, setGameData] = useState<any>([]);
  const [gameQuestions, setGameQuestions] = useState<any>([]);

  console.log(gameQuestions[gameData.curr_question_index]);

  useEffect(() => {
    if (gameData.length === 0) return;
    setGameQuestions(gameData.questions);
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
  return (
    <div className="flex flex-col w-6/12 bg-[#141C2F] h-full rounded-lg px-10 py-6">
      <div className="flex flex-col">
        <Image
          src={gem}
          alt="gemini pic"
          className="w-[4rem] h-[4rem] rounded-full"
        />
        <p className="text-white text-2xl font-bold">
          {gameQuestions[gameData.curr_question_index]?.question}
        </p>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-7 mt-7">
          {gameQuestions[gameData.curr_question_index]?.answers.map(
            (answer: any, index: any) => (
              <div
                key={index}
                className={`btn flex rounded-xl items-center text-lg text-white justify-between px-4 py-4 min-h-32 ${colors[index]}`}
              >
                <span className="font-medium">{answer.answer}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
