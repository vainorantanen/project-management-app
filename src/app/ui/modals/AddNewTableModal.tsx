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

interface AddNewTableProps {
    workspaceId: string
}

export default function AddNewTableModal({workspaceId}: AddNewTableProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PiPlusCircleDuotone className="h-5 w-5 mr-1"/>
                    <p>Luo uusi taulu</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
    <DialogHeader>
      <DialogTitle>Luo uusi taulu</DialogTitle>
    </DialogHeader>
        <AddNewTableForm workspaceId={workspaceId} />
  </DialogContent>
        </Dialog>
    )
}