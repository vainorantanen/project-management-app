"use client"

import { useFormState } from "react-dom";
import PendingShadSubmitButton from "../buttons/PendingShadSubmitButton";
import { addNewCategoryToTable, addNewTable, addNewWorkspace } from "@/app/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AddNewCategoryProps {
    tableId: string
}

export default function AddNewCategoryForm({tableId}: AddNewCategoryProps) {

  const initialState = { errorMessage: '', successMessage: undefined, errors: undefined };
    
    const [state, dispatch] = useFormState(addNewCategoryToTable.bind(null, tableId), initialState);

    return (
                 <form action={dispatch} className="flex flex-col gap-3 w-full">
        <div className="mb-4">
          <Label htmlFor="osoite" className="block text-gray-700">
            Kategoria*
          </Label>
          <Input
            type="text"
            id="category"
            placeholder="Kategoria"
            name="category"
            required
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