import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getTablesByWorkspaceId, getWorkspaceById } from "@/app/lib/data"
import AddNewTableModal from "@/app/ui/modals/AddNewTableModal"
import InviteNewParticipantWorkspaceModal from "@/app/ui/modals/InviteNewParticipantWorkspaceModal"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function Page({params}:any) {

    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      return (
        <p>Log in</p>
      )
    }

    const workspace = await getWorkspaceById(params.workspaceId)

    if (!workspace) {
        notFound()
    }

    const tables = await getTablesByWorkspaceId(workspace.id)

    return (
        <div className="flex flex-col gap-4 justify-center my-4">
            <h1>{workspace.title}</h1>
            <p className="whitespace-break-spaces">{workspace.description}</p>
            {workspace.participantIds}
            <div className="flex flex-row flex-wrap gap-1">
            <AddNewTableModal workspaceId={workspace.id} />
            <InviteNewParticipantWorkspaceModal workspaceId={workspace.id} />
              </div>
              <h1>Taulut</h1>
              <div className="flex flex-row gap-2 flex-wrap">
            {tables && tables.length > 0 ? (
              tables.map(t => (
                <Link key={t.id} href={`/workspaces/${workspace.id}/tables/${t.id}`}>
                  <Card>
                    <CardTitle>{t.title}</CardTitle>
                    <CardDescription>{t.description}</CardDescription>
                  </Card>
                </Link>
              ))
            ) : (
              <p>Ei tauluja</p>
            )}
            </div>
        </div>
    )
}