import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
  <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
    <h1>Project Management App</h1>
  </div>
  );
}
