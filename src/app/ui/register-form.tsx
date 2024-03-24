"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

const stylesForText = "block uppercase tracking-wide text-black-700 text-sm font-bold"

export default function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [ registerSuccess, setRegisterSuccess ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ name, setName ] = useState<string>("")

  const handleTermsCheckbox = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if ( !email || !password || !verifyPassword || !acceptedTerms) {
      return;
    }

    if (password !== verifyPassword) {
      return;
    }
    setLoading(true)
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { userExists } = await resUserExists.json();

      if (userExists === true) {
        setLoading(false)
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setRegisterSuccess(true)
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  };

  const handleResendEmail = async () => {
    console.log('sending email to ', email)
    try {
      await fetch('/api/sendRegisterEmail', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
  } catch(error) {
  }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {registerSuccess && (
        <div className="bg-sky-300 shadow-xl p-5 rounded-xl w-full max-w-md text-black">
          <h1>User registered successfully</h1>
          <div className="flex flex-row gap-2">
            <Button>
          <Link href={`/login`}>
            Log in
          </Link>
          </Button>
          <Button>
          <Link href={`/home`}>
            Home
          </Link>
          </Button>
            </div>
        </div>
      )}
      {!registerSuccess && (
      <div className="bg-sky-300 shadow-xl p-5 rounded-xl w-full max-w-md text-black">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-auto">

        <label
          className={stylesForText}
        >
          Name
        </label>
        <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="bg-white text-black rounded-lg px-3 py-2"
            required
          />
                  <label
          className={stylesForText}
        >
          Email
        </label>

                    <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="bg-white text-black rounded-lg px-3 py-2"
            required
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
            className="bg-white text-black rounded-lg px-3 py-2"
            required
          />
          <Input
          onChange={(e) => setVerifyPassword(e.target.value)}
          type="password"
          placeholder="Confirm password"
          className="bg-white text-black rounded-lg px-3 py-2"
          required
        />
       <div className="my-4 flex">
        <p className="text-black">
          Accept{" "}
          <a href="/terms-of-service" target='_blank' className="underline">
            Terms of service
          </a>
          :
        </p>
        <Input
          type="checkbox"
          id="terms"
          name="terms"
          checked={acceptedTerms}
          onChange={handleTermsCheckbox}
          className="ml-2 h-4 w-4 mt-1 border rounded-sm focus:ring-2 focus:ring-blue-500 text-blue-500"
          required
        />
      </div>

          <Button>
            Register
          </Button>

          <Link className="text-sm mt-3 text-right text-black" href={"/login"}>
           Already have a user? <span className="underline">Login</span>
          </Link>
          <Link className="text-sm mt-3 text-right text-black" href={"/unohdin-salasanan"}>
           <span className="underline">Forgot password?</span>
          </Link>
        </form>
      </div>
)}
    </div>
  );
}