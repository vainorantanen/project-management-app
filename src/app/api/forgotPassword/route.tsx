import prisma from "@/utils/db";
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

export async function POST(req: any) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } })
    // sähköpostin vahvistaminen

    if (!user) {
        throw new Error("Käyttäjää ei löytynyt")
    }

    const token = jwt.sign({ id: user.id }, process.env.NEXTAUTH_SECRET, { expiresIn: '1d' })
    const confirmLink = process.env.NODE_ENV === 'production' ? `https://www.doori.fi/salasanan-alustus/${user.id}/${token}` :
      `http://localhost:3000/reset-password/${user.id}/${token}`

    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: true,
      auth: {
        user: process.env.SENDING_EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    var mailOptions = {
      from: process.env.SENDING_EMAIL,
      to: email,
      subject: 'Salasanan palautus',
      html: `
      <p>Unohtuneen salasanan palautus. Alla olevasta napista pääset alustamaan uuden salasanan palveluumme.</p>
 <a href="${confirmLink}" style="background-color: #286ceb; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Siirry palauttamaan salasana</a>
      `
    }

    // eslint-disable-next-line no-unused-vars
    try {
        await transporter.sendMail(mailOptions)
        return NextResponse.json({ message: "Sähköposti lähtetty" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Tapahtui virhe sähköpostin lähettämisessä 1" },
            { status: 500 }
          );
    }

  } catch (error) {
    const er = error as Error
    return NextResponse.json(
        { message: er.message },
        { status: 500 }
      );
  }
}