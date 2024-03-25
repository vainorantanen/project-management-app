"use client"

import { useFormState } from "react-dom";
import PendingShadSubmitButton from "../buttons/PendingShadSubmitButton";
import { modifyTask } from "@/app/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ToastContainerComponent from "../ToastContainerComponent";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "@prisma/client";

interface ModifyTaskProps {
    categories: string[],
    task: Task
}

export default function ModifyTaskForm({categories,
task}: ModifyTaskProps) {

  const initialState = { errorMessage: '', successMessage: undefined, errors: undefined };
    
    const [state, dispatch] = useFormState(modifyTask.bind(null, task.id), initialState);

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
            defaultValue={task.title}
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
            defaultValue={task.description ? task.description : ''}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="category" className="block text-gray-700">
            Kategoria
          </Label>
          <Select
          name="category"
          required
          defaultValue={task.category}
          >
    <SelectTrigger>
      <SelectValue placeholder="Kaupunki tai kunta" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {categories.map(c => (
            <SelectItem key={c} value={c}>
                {c}
            </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
          
        </div>
        <div className="mb-4">
           <p className="my-4">* Pakollinen tieto</p>
        <PendingShadSubmitButton buttonText="Tallenna" />
       </div>

       </form>
    )
}