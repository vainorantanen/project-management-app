"use client"

import { useFormState } from "react-dom";
import PendingShadSubmitButton from "../buttons/PendingShadSubmitButton";
import { addNewWorkspace } from "@/app/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function AddNewWorkspaceForm() {

    const initialState = { errorMessage: '', successMessage: undefined, errors: undefined };
    
    const [state, dispatch] = useFormState(addNewWorkspace, initialState);

    return (
                 <form action={dispatch} className="flex flex-col gap-3 w-full">
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