// import { redirect } from "next/navigation";
// import { createClient } from "../../utils/supabase/server";
import JoinModal from "./join";
import CreateModal from "./create";

export default function Page() {
  return (
    <main
      className="flex justify-center items-center w-screen h-screen"
      style={{
        backgroundImage:
          "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('background.webp')",
      }}
    >
      <div className="flex w-auto text-center gap-10 flex-col justify-center items-center">
        <div className="flex p-8 bg-gradient-to-r from-[#19263F] to-[#495e85] rounded-2xl">
          <h1 className="text-9xl	font-bold text-white">Know-It!</h1>
        </div>
        <div className="flex gap-5">
          <JoinModal />
          <CreateModal />
        </div>
      </div>
    </main>
  );
}
