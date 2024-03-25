"use client"

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ToastContainerComponent from "../ToastContainerComponent";
import { Button } from "@/components/ui/button";

type ConfirmEmailProps = {
  userId: string;
  token: string
}

export default function ConfirmEmailButton({ userId, token }: ConfirmEmailProps) {
  const router = useRouter();

  const handleConfirm = async (e: any) => {
    e.preventDefault();

    try {
      const confirmRes = await fetch('/api/confirmEmail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, token }),
      })

      if (confirmRes.ok) {
        toast.success("Sähköposti vahvistettu onnistuneesti")
        router.push('/login')
      }
    } catch (error) {
      toast.error("Virhe sähköpostin vahvistamisessa")
      console.log("Error during confirmation: ", error);
    }
  } 
  
  return (
    <div>
      <ToastContainerComponent />
      <Button
      onClick={handleConfirm}>Vahvista sähköposti
      </Button>
    </div>
  )
}