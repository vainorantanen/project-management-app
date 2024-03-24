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
import AddNewCategoryForm from "../forms/AddNewCategoryForm"
import AddNewTaskForm from "../forms/AddNewTaskForm"

interface AddNewTaskProps {
    tableId: string
    category: string
}

export default function AddNewTaskModal({tableId, category}: AddNewTaskProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PiPlusCircleDuotone className="h-5 w-5 mr-1"/>
                    <p>Luo uusi kortti</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
    <DialogHeader>
      <DialogTitle>Luo uusi kortti kategoriaan: {category}</DialogTitle>
    </DialogHeader>
        <AddNewTaskForm tableId={tableId} category={category} />
  </DialogContent>
        </Dialog>
    )
}