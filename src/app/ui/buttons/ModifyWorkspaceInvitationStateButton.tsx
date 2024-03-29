"use client"

import { WorkspaceInvitationStatus } from "@/app/lib/types"
import { Button } from "@/components/ui/button"

interface ModifyWorkspaceInvitationProps {
    invitationId: string,
    status: WorkspaceInvitationStatus,
    modifyWorkspaceInvitationStatus: (
        invitationId: string,
        status: WorkspaceInvitationStatus
    ) => Promise<void>
}

export default function ModifyWorkspaceInvitationButton({invitationId, 
    status,  modifyWorkspaceInvitationStatus}: ModifyWorkspaceInvitationProps) {

    const handleClick = async () => {
        if (!window.confirm("Modify?")) {
            return
        }
        try {
            await modifyWorkspaceInvitationStatus(invitationId, status)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Button onClick={handleClick}>
            {status}
        </Button>
    )
}