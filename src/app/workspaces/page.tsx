import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import AddNewWorkspaceModal from "../ui/modals/AddNewWorkspaceModal"
import { getUsersCreatedWorkspaces, getUsersParticipantWorkspaces } from "../lib/data"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function Page() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      return (
        <p>Log in</p>
      )
    }

    const usersWorkspaces = await getUsersCreatedWorkspaces()
    const userParticipantInWorkspaces = await getUsersParticipantWorkspaces()

    return (
        <div className="flex flex-col gap-4 justify-center my-4">
            <h1 className="text-center">Työtilat</h1>
            <AddNewWorkspaceModal />
            <h1 className="text-center">Luomasi työtilat</h1>
            <div className="flex flex-wrap gap-2 my-8 justify-center w-full h-auto max-w-5xl">
            {usersWorkspaces && usersWorkspaces.length > 0 ? (
              usersWorkspaces.map(w => (
                <div key={w.id}>
                <Link href={`/workspaces/${w.id}`}>
                  <Card>
                    <CardTitle>{w.title}</CardTitle>
                    <CardDescription className="whitespace-break-spaces">{w.description}</CardDescription>
                  </Card>
                </Link>
                </div>
              ))
            ) : (
              <p>Ei työtiloja</p>
            )}
            </div>
            <h1 className="text-center">Työtilat, joissa olet osallisena</h1>
            {userParticipantInWorkspaces && userParticipantInWorkspaces.length > 0 ? (
              userParticipantInWorkspaces.map(w => (
                <div key={w.id}>
                <Link href={`/workspaces/${w.id}`}>
                  <Card>
                    <CardTitle>{w.title}</CardTitle>
                    <CardDescription className="whitespace-break-spaces">{w.description}</CardDescription>
                  </Card>
                </Link>
                </div>
              ))
            ) : (
              <p>Ei työtiloja</p>
            )}
        </div>
    )
}