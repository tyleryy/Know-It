import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import Leaderboard from "./leaderboard";
import AiGame from "./aiGame";
import Chat from "./chat";

export default async function Page() {
  //   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  //   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  //   const supabase = createClient(supabaseUrl, supabaseKey);

  //   const { data, error } = await supabase.auth.getUser();
  //   const { user } = data;

  //   if (error) {
  //     console.log(error);
  //     redirect("/login");
  //   }

  //   const { data: users } = await supabase.from("Users").select("");

  return (
    <main className="flex bg-[#19263F] justify-center items-center bg-primary w-screen h-screen ">
      <div className="flex w-full h-[70vh] justify-center items-center gap-7">
        <Leaderboard />
        <AiGame />
        <Chat />
      </div>
    </main>
  );
}
