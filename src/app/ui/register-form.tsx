"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import ToastContainerComponent from "./ToastContainerComponent";
import { toast } from "react-toastify";
import { sendRegisterEmail } from "../lib/functions";

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
        const sendMailRes = await sendRegisterEmail(email)

        // status 200 = ok
        if (sendMailRes.status === 200) {
          //router.push("/kiitos-rekisteroitymisesta");
          setRegisterSuccess(true)
          // Scroll to section with id "register-email-confirm"
        const registerEmailConfirmSection = document.getElementById('register-email-confirm');
        if (registerEmailConfirmSection) {
          registerEmailConfirmSection.scrollIntoView({ behavior: 'smooth' });
        }
        setLoading(false)
        } else {
          setLoading(false)
          toast.error("Sähköpostin lähettäminen epäonnistui")
        }
      } else {
        setLoading(false)
        toast.error("Käyttäjän luominen epäonnistui")
      }
    } catch (error) {
      setLoading(false)
      toast.error("Tapahtui jokin virhe rekisteröitymisessä")
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
     <ToastContainerComponent />
      {registerSuccess && (
          <div
          id="register-email-confirm"
          className="p-4 max-w-lg mx-auto rounded-xl flex flex-col justify-start shadow-lg bg-sky-300 text-black my-3">
            <h1 className="text-2xl font-bold my-3">Käyttäjä luotu onnistuneesti.</h1>
            <p className="text-2xl my-2">Lähetimme sinulle vahvistussähköpostin. Vahvista vielä sähköpostisi.</p>
            <p>Etkö saanut vahvistussähköpostia?</p>
            <button
            onClick={handleResendEmail}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                Lähetä uusi vahvistus
            </button>
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