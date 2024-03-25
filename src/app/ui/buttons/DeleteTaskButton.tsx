"use client"

import { Button } from "@/components/ui/button"

interface DeleteTaskProps {
    taskId: string,
    deleteTask: (taskId:string) => Promise<void>
}

export default function DeleteTaskButton({taskId, deleteTask}: DeleteTaskProps) {

    const handleDelete = async () => {
        if (!window.confirm("Poistetaanko?")) {
            return
        }
        try {
            await deleteTask(taskId)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Button onClick={handleDelete}>
            Poista
        </Button>
    )
}