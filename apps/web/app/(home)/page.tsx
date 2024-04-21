// import { redirect } from "next/navigation";
// import { createClient } from "../../utils/supabase/server";
import JoinModal from "./join";
import CreateModal from "./create";

export default function Page() {
  // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey);

  // const { data, error } = await supabase.auth.getUser();
  // const { user } = data;

  // if (error) {
  //   console.log(error);
  //   redirect("/login");
  // }

  // const { data: users } = await supabase.from("Users").select("");

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