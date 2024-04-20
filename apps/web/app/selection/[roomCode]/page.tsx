"use client";

const NameSelectionPage = ({params}) => {
  return (
    <main className="flex justify-center items-center bg-primary w-screen h-screen bg-purple-200">
      <h1 className="text-7xl	font-bold">Pick Your Character! in room {params.roomCode}</h1>
    </main>
  );
};

export default NameSelectionPage;
