import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PiPlusCircleDuotone } from "react-icons/pi"
import AddNewTableForm from "../forms/AddNewTableForm"
import InviteNewParticipantWorkspaceForm from "../forms/InviteNewParticipantWorkspaceForm"
import { sendWorkspaceInvitation } from "@/app/lib/actions"

interface AddNewTableProps {
    workspaceId: string
}

export default function InviteNewParticipantWorkspaceModal({workspaceId}: AddNewTableProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PiPlusCircleDuotone className="h-5 w-5 mr-1"/>
                    <p>Invite new participant</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
    <DialogHeader>
      <DialogTitle>Invite new participant</DialogTitle>
    </DialogHeader>
        <InviteNewParticipantWorkspaceForm workspaceId={workspaceId} sendWorkspaceInviation={sendWorkspaceInvitation}/>
  </DialogContent>
        </Dialog>
    )
}