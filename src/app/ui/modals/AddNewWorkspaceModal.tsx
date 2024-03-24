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
import AddNewWorkspaceForm from "../forms/AddNewWorkspaceForm"

export default function AddNewWorkspaceModal() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PiPlusCircleDuotone className="h-5 w-5 mr-1"/>
                    <p>Luo uusi työtila</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
    <DialogHeader>
      <DialogTitle>Luo uusi työtila</DialogTitle>
    </DialogHeader>
        <AddNewWorkspaceForm />
  </DialogContent>
        </Dialog>
    )
}