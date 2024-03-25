"use client"

import { useFormState } from "react-dom";
import PendingShadSubmitButton from "../buttons/PendingShadSubmitButton";
import { addNewCategoryToTable, addNewTable, addNewTask, addNewWorkspace } from "@/app/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ToastContainerComponent from "../ToastContainerComponent";

interface AddNewTaskProps {
    tableId: string
    category: string
}

export default function AddNewTaskForm({tableId, category}: AddNewTaskProps) {

  const initialState = { errorMessage: '', successMessage: undefined, errors: undefined };
    
    const [state, dispatch] = useFormState(addNewTask.bind(null, tableId, category), initialState);

    useEffect(() => {
      if (state.successMessage) {
          toast.success(state.successMessage)
          //setShowContinueButton(true)
      } else if (state.errorMessage) {
          toast.error(state.errorMessage)
      }
  }, [state])

    return (
   <form action={dispatch} className="flex flex-col gap-3 w-full">
        <ToastContainerComponent />
        <div className="mb-4">
          <Label htmlFor="osoite" className="block text-gray-700">
            Otsikko*
          </Label>
          <Input
            type="text"
            id="title"
            placeholder="Otsikko"
            name="title"
            required
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="description" className="block text-gray-700">
            Kuvaus
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Kirjoita kuvaus"
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
           <p className="my-4">* Pakollinen tieto</p>
        <PendingShadSubmitButton buttonText="Tallenna" />
       </div>

       </form>
    )
}