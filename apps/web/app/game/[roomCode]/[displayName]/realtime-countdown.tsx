"use client";
import React, { useState, useEffect } from "react";
import WinModal from "./winModal";
import { createClient } from "../../../../utils/supabase/client";

function Countdown() {
  const supabase = createClient();
  const [counter, setCounter] = useState(10); // Initialize the counter state
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   // Set up the interval
  //   const interval = setInterval(() => {
  //     setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
  //   }, 1000);

  //   // Clear interval on component unmount
  //   return () => clearInterval(interval);
  // }, []); // Empty dependency array ensures this effect only runs once on mount

  useEffect(() => {
    const fetchData = async () =>
      await supabase
        .from("Games")
        .select()
        .then((data: any) => setData(data.data));
    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      <div className="countdown text-6xl font-bold text-white mb-2">
        {/* Dynamically update the CSS variable */}
        <span
          id="counterElement"
          style={{ "--value": counter } as React.CSSProperties}
        >
          {counter}
        </span>
      </div>
      {/* <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        open modal
      </button> */}

      {/* <WinModal id={"my_modal_3"} /> */}
    </>
  );
}

export default Countdown;
