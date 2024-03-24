"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function SignOutButton() {
    return (
<Button className="flex" onClick={() =>
    signOut()
    }>
    <span>Kirjaudu ulos</span>
    </Button>
    )
}