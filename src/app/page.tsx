import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/options";
import SignOutButton from "./ui/buttons/SignOutButton";

export default async function Home() {

  const session = await getServerSession(authOptions)

  console.log('session at home', session)

  return (
  <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
    <h1>Proju etusivu</h1>
  </div>
  );
}
