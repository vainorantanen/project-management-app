"use client"

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import ToastContainerComponent from "../ui/ToastContainerComponent";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");


    const handleSubmit = async (e:any) => {

        if ( !email) {
            toast.error("Täytä sähköposti")
            return;
        }

        try {
            const res = await fetch('/api/forgotPassword', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
              }),
            });
        
            if (res.ok) {
              // Success case
              toast.success("Sähköposti lähetetty onnistuneesti");
            } else {
              // Error case
              const errorData = await res.json();
              toast.error(errorData.message || "Virhe sähköpostin lähettämisessä");
            }
          } catch (error) {
            // Network error or other unexpected errors
            console.error("Unexpected error:", error);
            toast.error("Tapahtui odottamaton virhe");
          }
        
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
        <ToastContainerComponent />
        <div className="bg-sky-300 shadow-xl p-5 rounded-xl w-full max-w-md text-black">
          <h1 className="text-xl font-bold my-4 text-center">Ongelmia sisäänkirjautumisessa?</h1>
          <p>Anna sähköpostiosoitteesi, niin lähetämme sinulle linkin, jolla pääset takaisin tiliisi.</p>
            <form action={handleSubmit} className="flex flex-col gap-3 mx-auto">

                    <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Sähköposti"
            className="bg-white text-black rounded-lg px-3 py-2 mt-2"
            required
          />
                <Button
                disabled={email.length <= 0}
                type="submit">
                    Lähetä
                </Button>
            </form>
            <div className="text-center my-4">
            <p>TAI</p>
            <Link className="text-sm mt-3 text-right text-black" href={"/register"}>
            <span className="underline">Luo uusi käyttäjä</span>
          </Link>
            </div>
        </div>
        </div>
    )
}