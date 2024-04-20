import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

export default async function Page() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.auth.getUser();
  const { user } = data;

  if (error) {
    console.log(error);
    redirect("/login");
  }

  const { data: users } = await supabase.from("Users").select("");

  return (
    <main>
      <h1 className="text-3xl font-bold underline text-red-700">
        Hello world!
      </h1>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-outline btn-primary ">Primary</button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  );
}
