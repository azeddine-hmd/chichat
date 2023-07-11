import { redirect } from "next/navigation";

export default function Home() {
  redirect("/register");

  return (
    <main className="w-full h-full bg-gray-600" >
      <div></div>
    </main>
  );
}
