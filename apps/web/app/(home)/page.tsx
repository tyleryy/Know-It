// import { redirect } from "next/navigation";
// import { createClient } from "../../utils/supabase/server";
import JoinModal from "./join";
import CreateModal from "./create";

export default function Page() {
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <div className="flex w-auto text-center gap-5 flex-col justify-center items-center">
        <h1 className="text-7xl	font-bold text-slate-700">Know-It!</h1>
    
        <div className="flex gap-5">
          <JoinModal />
          <CreateModal />
        </div>
      </div>
    </main>
  );
}
