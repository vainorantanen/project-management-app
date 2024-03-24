import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/options";
import SignOutButton from "./ui/SignOutButton";

export default async function Home() {

  const session = await getServerSession(authOptions)

  console.log('session at home', session)

  return (
  <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
    <Button>
    <Link href={`/login`}>
      Log in
    </Link>
    </Button>
    <Button>
    <Link href={`/register`}>
      Register
    </Link>
    </Button>
    <h1>Nextjs 14 project template</h1>
    {session && session.user ? (
        <div>
          <p>Logged in as {session.user.email}</p>
          <SignOutButton />
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
        </div>
      )}
  </div>
  );
}
