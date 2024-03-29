"use client"


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface InviteNewParticipantWorkspaceFormProps {
    workspaceId: string
    sendWorkspaceInviation: (workspaceId: string, email: string) => Promise<{error?: string, success?: string}>
}

export default function InviteNewParticipantWorkspaceForm({workspaceId, sendWorkspaceInviation}:
    InviteNewParticipantWorkspaceFormProps) {
        const [email, setEmail] = useState<string>("");
        const [error, setError] = useState<string>("")
        const [success, setSuccess] = useState<string>("")

        const handleSubmit = async () => {
            if (!email) {
                return
            }
            try {
                  const res = await sendWorkspaceInviation(workspaceId, email)
                  if (res.success) {
                    setSuccess(res.success)
                    setError("")
                    console.log(res.success)
                  } else if (res.error) {
                    setSuccess("")
                    setError(res.error)
                    console.log(res.error)
                  }
            } catch (error) {
                console.log(error)
            }
        }

    return (
                 <div className="flex flex-col gap-3 w-full">
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
          {error && (
            <p className="text-red-500">{error}</p>
          )}
          {success && (
            <p className="text-green-500">{success}</p>
          )}
        </div>
        <div className="mb-4">
        <Button onClick={handleSubmit}>
            Invite
        </Button>
       </div>

       </div>
    )
}