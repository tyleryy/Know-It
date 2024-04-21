"use client";
import React, { useState, useEffect } from "react";

function Countdown() {
  const [counter, setCounter] = useState(10); // Initialize the counter state

  useEffect(() => {
    // Set up the interval
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect only runs once on mount

  return (
    <div className="countdown text-6xl font-bold text-white mb-2">
      {/* Dynamically update the CSS variable */}
      <span
        id="counterElement"
        style={{ "--value": counter } as React.CSSProperties}
      >
        {counter}
      </span>
    </div>
  );
}

export default Countdown;
