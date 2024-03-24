import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import AddNewWorkspaceModal from "../ui/modals/AddNewWorkspaceModal"
import { getUsersCreatedWorkspaces } from "../lib/data"
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

    return (
        <div>
            <h1>Työtilat</h1>
            <AddNewWorkspaceModal />
            <h1>Luomasi työtilat</h1>
            {usersWorkspaces && usersWorkspaces.length > 0 ? (
              usersWorkspaces.map(w => (
                <Link key={w.id} href={`/workspaces/${w.id}`}>
                  <Card>
                    <CardTitle>{w.title}</CardTitle>
                    <CardDescription>{w.description}</CardDescription>
                  </Card>
                </Link>
              ))
            ) : (
              <p>Ei työtiloja</p>
            )}
            <h1>Työtilat, joissa olet osallisena</h1>
        </div>
    )
}