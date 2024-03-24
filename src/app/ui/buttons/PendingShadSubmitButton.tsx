"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import SmallLoadingCircleOnly from "../SmallLoadingCircleOnly"

export default function PendingShadSubmitButton({buttonText}: {buttonText: string}) {
  
    const { pending } = useFormStatus()
  
    return (
            <Button
        aria-disabled={pending}
          type="submit"
        >
                          {pending ? (
        <SmallLoadingCircleOnly borderColor="border-white" />
        ): buttonText}
        </Button>
    )
  }