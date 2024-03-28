"use client"


import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface InviteNewParticipantWorkspaceFormProps {
    workspaceId: string
}

export default function InviteNewParticipantWorkspaceForm({workspaceId}:
    InviteNewParticipantWorkspaceFormProps) {
        const [email, setEmail] = useState<string>("");


        const handleSubmit = async () => {

            if (!email) {
                return
            }

            try {
                const resUserExists = await fetch("api/userExists", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                  });
            
                  const { userExists } = await resUserExists.json();
            
                  if (userExists !== true) {
                    return;
                  }

                  const res = await fetch("api/sendWorkspaceInvitation", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email,
                    workspaceId }),
                  });

                  if (res.ok) {
                    console.log("success")
                  } else {
                    throw new Error("Error")
                  }

            } catch (error) {
                console.log(error)
            }
        }
        

    return (
                 <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div className="mb-4">
          <Label htmlFor="osoite" className="block text-gray-700">
            Email*
          </Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            required
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
        <Button
        type="submit">
            Invite
        </Button>
       </div>

       </form>
    )
}