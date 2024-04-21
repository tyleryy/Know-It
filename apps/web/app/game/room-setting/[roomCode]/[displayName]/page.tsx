"use client";

import { useState } from "react";
import ReadyButton from "./ReadyButton";
import { createClient } from "../../../../../utils/supabase/client";
import { navigateToSelection } from "./actions";

interface PageProps {
  params: any;
}

const RoomSetting = ({ params }: PageProps) => {
  // Initialize state with the default value 25
  const [num_Qs, setNumQs] = useState<any>(10);
  const [time, setTime] = useState<any>(10);

  const supabase = createClient();

  const handleClick = async () => {
    // update players array in gameState
    const { error } = await supabase
      .from("Games")
      .update({
        max_time: time,
        max_questions: num_Qs,
      })
      .eq("room_id", params.roomCode);
    if (error) {
      alert("Error setting room settings");
      return;
    }
    navigateToSelection(params.roomCode, params.displayName);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-20">
      <div className="flex flex-col gap-5">
        <>
          <span className="text-6xl text-black ">Number of Questions</span>
          <div>
            <input
              type="range"
              min={5}
              max={20}
              value={num_Qs}
              onChange={(event) => setNumQs(event.target.value)}
              className="range range-primary"
              step={5}
            />
            <div className="w-full flex justify-between text-xs px-2 text-black">
              <span>| 5</span>
              <span>| 10</span>
              <span>| 15</span>
              <span>| 20</span>
              {/* <span>|</span> */}
            </div>
          </div>
        </>
      </div>

      <div className="flex flex-col gap-5">
        <>
          <span className="text-6xl text-black ">Time per Question</span>
          <div>
            <input
              type="range"
              min={5}
              max={20}
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="range range-secondary"
              step={5}
            />
            <div className="w-full flex justify-between text-xs px-2 text-black">
              <span>| 5</span>
              <span>| 10</span>
              <span>| 15</span>
              <span>| 20</span>
              {/* <span>|</span> */}
            </div>
          </div>
        </>
      </div>
      <ReadyButton label="Ready" formAction={handleClick} />
    </div>
  );
};

export default RoomSetting;
