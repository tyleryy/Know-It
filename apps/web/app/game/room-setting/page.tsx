"use client";

import { use, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

// const QuestionRange = ({ value, setValue, min, max, className }) => {
//   useEffect(() => {
//     console.log(value);
//   });
//   return (
//     <>
//       <span className="text-5xl text-black underline ">
//         Number of Questions
//       </span>
//       <div>
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={value}
//           onChange={(event) => setValue(event.target.value)}
//           className={twMerge("range", className)}
//           step={max / 4}
//         />
//         <div className="w-full flex justify-between text-xs px-2 text-black">
//           <span>| 5</span>
//           <span>| 10</span>
//           <span>| 15</span>
//           <span>| 20</span>
//           {/* <span>|</span> */}
//         </div>
//       </div>
//     </>
//   );
// };

const RoomSetting = () => {
  // Initialize state with the default value 25
  const [num_Qs, setNumQs] = useState<any>(10);
  const [time, setTime] = useState<any>(10);

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

      <button className="btn btn-default text-black bg-white m-10 w-48 h-16 border-none hover:text-white hover:bg-purple-800 rounded-3xl">
        Ready
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default RoomSetting;
