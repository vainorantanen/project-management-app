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

interface AddNewCategoryProps {
    tableId: string
}

export default function AddNewCategoryModal({tableId}: AddNewCategoryProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PiPlusCircleDuotone className="h-5 w-5 mr-1"/>
                    <p>Luo uusi kategoria</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
    <DialogHeader>
      <DialogTitle>Luo uusi kategoria</DialogTitle>
    </DialogHeader>
        <AddNewCategoryForm tableId={tableId} />
  </DialogContent>
        </Dialog>
    )
}