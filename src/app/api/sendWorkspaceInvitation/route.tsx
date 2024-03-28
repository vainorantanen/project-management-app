import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { WorkspaceInvitationStatus } from "@/app/lib/types";

export async function POST(req: any) {
  try {
    const { email, workspaceId } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } })
    // sähköpostin vahvistaminen

    if (!user) {
        throw new Error("No such user")
    }

    if (!workspaceId) {
        throw new Error("No id provided")        
    }

    const workspace = await prisma.workspace.findUnique({
        where: {
            id: workspaceId
        }
    })

    if (!workspace) {
        throw new Error("No workspace")
    }

    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
        throw new Error("Log in")
    }

    await prisma.workspaceInvitation.create({
        data: {
           senderUser: {
            connect: {
                id: session.user.id
            }
           },
           receiverUser: {
            connect: {
                id: user.id
            }
           },
           status: WorkspaceInvitationStatus.PENDING,
           workspace: {
            connect: {
                id: workspace.id
            }
           }
        }
    })

    // eslint-disable-next-line no-unused-vars
    try {

        return NextResponse.json({ message: "Success" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error" },
            { status: 500 }
          );
    }

  } catch (error) {
    return NextResponse.json(
        { message: "Error" },
        { status: 500 }
      );
  }
}