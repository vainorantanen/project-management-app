"use server"

import { getServerSession } from "next-auth"
import { unstable_noStore as noStore } from "next/cache"
import { authOptions } from "../api/auth/[...nextauth]/options"
import prisma from "@/utils/db"

// data requests


export async function getUser() {
    noStore()
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user || !session.user.email || !session.user.id) {
            return false
        }

        const user = await prisma.user.findUnique({where: {id: session.user.id}})

        if (!user) {
            return false
        }

        return user

    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getWorkspaceById(workspaceId: string) {
    noStore()
    try {
        const res = await prisma.workspace.findUnique({
            where: {
                id: workspaceId
            }
        })

        return res
    } catch (error) {
        throw new Error("No workspace found")
    }
}

export async function getTableById(tableId: string) {
    noStore()
    try {
        const res = await prisma.table.findUnique({
            where: {
                id: tableId
            }
        })

        return res
    } catch (error) {
        throw new Error("No table found")
    }
}


export async function getUsersCreatedWorkspaces() {
    noStore()
    try {

        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            throw new Error("Kirjaudu sisään")
        }

        const res = await prisma.workspace.findMany({
            where: {
                userId: session.user.id
            }
        })

        return res
    } catch (error) {
        const er = error as Error
        throw new Error(er.message)
    }
}

export async function getTablesByWorkspaceId(workspaceId:string) {
    noStore()
    try {

        const res = await prisma.table.findMany({
            where: {
                workspaceId
            }
        })

        return res
    } catch (error) {
        const er = error as Error
        throw new Error(er.message)
    }
}

export async function getTasksByTableId(tableId:string) {
    noStore()
    try {

        const res = await prisma.task.findMany({
            where: {
                tableId
            }
        })

        return res
    } catch (error) {
        const er = error as Error
        throw new Error(er.message)
    }
}

export async function getUserSentWorkspaceInvitations() {
    noStore()
    try {

        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            throw new Error("Kirjaudu sisään")
        }


        const res = await prisma.workspaceInvitation.findMany({
            where: {
                senderUserId: session.user.id
            },
            include: {
                workspace: {
                    select: {
                        title: true
                    }
                }
            }
        })

        return res
    } catch (error) {
        const er = error as Error
        throw new Error(er.message)
    }
}

export async function getUserReceivedWorkspaceInvitations() {
    noStore()
    try {

        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            throw new Error("Kirjaudu sisään")
        }


        const res = await prisma.workspaceInvitation.findMany({
            where: {
                receiverUserId: session.user.id
            },
            include: {
                workspace: {
                    select: {
                        title: true
                    }
                }
            }
        })

        return res
    } catch (error) {
        const er = error as Error
        throw new Error(er.message)
    }
}