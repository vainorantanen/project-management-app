import prisma from "@/utils/db";
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

export async function POST(req: any): Promise<NextResponse> {
    try {
        const { id, token, password } = await req.json()
        
        console.log({ id, token, password })

        if (!id || !token) {
            return NextResponse.json(
                { message: "id tai token viallinen" },
                { status: 400 }
            );
        }

        if (!password || password.length < 3) {
            return NextResponse.json(
                { message: "Salasanaa ei annettu tai se on liian lyhyt" },
                { status: 400 }
            );
        }
 
        const hashedPassword = await bcrypt.hash(password, 10)

        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.NEXTAUTH_SECRET, (err: any) => {
                if(err) {
                   resolve(NextResponse.json(
                       { message: "Error with token" },
                       { status: 500 }
                   ));
                } else {
                   prisma.user.update({ where: { id }, data: {
                       password: hashedPassword
                       }
                   }).then(r => resolve(NextResponse.json({ message: "Salasana vaihdettu" }, { status: 201 })))
                   .catch(error => 
                       resolve(NextResponse.json(
                       { message: "Tapahtui virhe salasanan vaihdossa" },
                       { status: 500 }
                     )))
                }
            })
        });
    } catch(error) {
        const er = error as Error
        return NextResponse.json(
            { message: er.message },
            { status: 500 }
        );
    }
 }