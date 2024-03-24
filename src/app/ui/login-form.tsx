"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const stylesForText = "block uppercase tracking-wide text-black-700 text-sm font-bold"

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {

    if (!email || !password) {
      return
    }
    setLoading(true)
    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: '/'
      });

      if (res?.error) {
        console.log(res?.error)
        setLoading(false)
        return;
      }

      if (res?.ok) {
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="bg-sky-300 shadow-xl p-5 rounded-xl w-full max-w-md text-black">
        <h1 className="text-xl font-bold my-4">Log in</h1>

        <form action={handleSubmit} className="flex flex-col gap-3">
        <label
          className={stylesForText}
        >
          Email
        </label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="bg-white text-black rounded-lg px-3 py-2"
          />
                  <label
          className={stylesForText}
        >
          Password
        </label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="bg-white text-black rounded-lg px-3 py-2"
          />
          <Button>
            Log in
          </Button>

          <Link className="text-sm mt-3 text-right text-black" href="/register">
            Dont have a user yet? <span className="underline">Register</span>
          </Link>
          <Link className="text-sm mt-3 text-right text-black" href={"/unohdin-salasanan"}>
           <span className="underline">Forgot password</span>
          </Link>
        </form>
      </div>
    </div>
  );
}