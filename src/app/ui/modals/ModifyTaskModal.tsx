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
import { FaEdit } from "react-icons/fa"
import ModifyTaskForm from "../forms/ModifyTaskForm"
import { Task } from "@prisma/client"

interface ModifyTaskProps {
    task: Task,
    categories: string[],
}

export default function ModifyTaskModal({task, categories}: ModifyTaskProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <FaEdit className="h-5 w-5 mr-1"/>
                    <p>Muokkaa</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
    <DialogHeader>
      <DialogTitle>Muokkaa</DialogTitle>
    </DialogHeader>
        <ModifyTaskForm task={task} categories={categories} />
  </DialogContent>
        </Dialog>
    )
}