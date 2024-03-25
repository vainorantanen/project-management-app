"use client"

import ToastContainerComponent from "@/app/ui/ToastContainerComponent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetPasswordPage({params}: any) {

    const { id, token } = params

    const [password, setPassword] = useState<string>("");
    const [verifyPassword, setVerifyPassword] = useState<string>("");

    const handleSubmit = async (e:any) => {
        
        if (!password || !verifyPassword) {
            toast.error("Täytä kaikki kentät")
            return;
          }
      
          if (password !== verifyPassword) {
            toast.error("Salasanat eivät täsmää")
            return;
          }

          try {
            
            const res = await fetch('/api/resetPassword', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  password,
                  id,
                  token
                }),
            })

            if (res.ok) {
                // Success case
                toast.success("Salanasa vaihdettu onnistuneesti");
              } else {
                // Error case
                const errorData = await res.json();
                toast.error(errorData.message || "Virhe Salasanan vaihdossa");
              }

          } catch (error) {
            toast.error((error as Error).message)
          }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <ToastContainerComponent />
            <div className="bg-sky-300 shadow-xl p-5 rounded-xl w-full max-w-md text-black">
            <h1 className="text-center">Vaihda salasana</h1>

            <form action={handleSubmit} className="flex flex-col gap-3 mx-auto my-2">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Salasana"
            className="bg-white text-black rounded-lg px-3 py-2"
            required
          />
          <input
          onChange={(e) => setVerifyPassword(e.target.value)}
          type="password"
          placeholder="Vahvista salasana"
          className="bg-white text-black rounded-lg px-3 py-2"
          required
        />
        <Button
        type="submit"
        disabled={password.length <= 0 || verifyPassword.length <= 0}
        >
            Vahvista
        </Button>

            </form>
            </div>
        </div>
    )
}