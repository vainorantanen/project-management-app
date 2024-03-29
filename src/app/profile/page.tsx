import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { getUserReceivedWorkspaceInvitations, getUserSentWorkspaceInvitations } from "../lib/data"
import ModifyWorkspaceInvitationButton from "../ui/buttons/ModifyWorkspaceInvitationStateButton"
import { WorkspaceInvitationStatus } from "../lib/types"
import { modifyWorkspaceInvitationState } from "../lib/actions"

export default async function Page() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return null
    }

    const userSentWorkspaceInvitations = await getUserSentWorkspaceInvitations()
    const userReceivedWorkspaceInvitations = await getUserReceivedWorkspaceInvitations()

    return (
        <div>
            <h1>Welcome, {session.user.name}</h1>
            <h1>Sent Invitations</h1>
            {userSentWorkspaceInvitations && (
                userSentWorkspaceInvitations.map(invitation => (
                    <div key={invitation.id}>
                        <p>{invitation.workspace.title}, {invitation.status}</p>
                    </div>
                ))
            )}
            <h1>Received invitations</h1>
            {userReceivedWorkspaceInvitations && (
                userReceivedWorkspaceInvitations.map(invitation => (
                    <div key={invitation.id}>
                        <p>{invitation.workspace.title}, {invitation.status}</p>
                        {invitation.status === WorkspaceInvitationStatus.PENDING && (
                            <div>
                                <ModifyWorkspaceInvitationButton invitationId={invitation.id}
                                status={WorkspaceInvitationStatus.ACCEPTED}
                                modifyWorkspaceInvitationStatus={modifyWorkspaceInvitationState}/>
                                <ModifyWorkspaceInvitationButton invitationId={invitation.id}
                                status={WorkspaceInvitationStatus.REJECTED}
                                modifyWorkspaceInvitationStatus={modifyWorkspaceInvitationState}/>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}