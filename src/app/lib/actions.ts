"use server"

import { revalidatePath } from "next/cache";
import { AddCategoryState, AddTableState, AddTaskState, AddWorkspaceState } from "./formStates";
import { FormSchemaAddCategory, FormSchemaAddTable, FormSchemaAddTask, FormSchemaAddWorkspace } from "./formSchemas";
import prisma from "@/utils/db";
import { getUser } from "./data";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

// server actions

export async function addNewWorkspace(
  prevState: AddWorkspaceState,
  formData: FormData
) {
 
    const validatedFields = FormSchemaAddWorkspace.safeParse({
        description: formData.get('description'),
        title: formData.get('title'),
      });
      
      if (!validatedFields.success) {
          return {
            errors: validatedFields.error.flatten().fieldErrors,
            errorMessage: 'Täytä tarvittavat tiedot',
          };
        }
    
        const { description, title,
        } = validatedFields.data
  
    try {

        const session = await getServerSession(authOptions)
  
        if (!session || !session.user) {
          throw new Error("Kirjaudu sisään")
        }

        await prisma.workspace.create({
            data: {
                title,
                description,
                user: {
                    connect: {
                        id: session.user.id
                    }
                }
            }
            
        })

        revalidatePath('/workspaces')
        return {successMessage: 'Tallennettu'}
    } catch(error) {
        return {
          errorMessage: error instanceof Error ? error.message : "An error occurred",          };
    }
}

export async function addNewTable(
  workspaceId: string,
  prevState: AddTableState,
  formData: FormData
) {
 
    const validatedFields = FormSchemaAddTable.safeParse({
        description: formData.get('description'),
        title: formData.get('title'),
      });
      
      if (!validatedFields.success) {
          return {
            errors: validatedFields.error.flatten().fieldErrors,
            errorMessage: 'Täytä tarvittavat tiedot',
          };
        }
    
        const { description, title,
        } = validatedFields.data
  
    try {

        if (!workspaceId) {
          throw new Error("WorkspaceId missing")
        }

        const workspace = await prisma.workspace.findUnique({
          where: {
            id: workspaceId
          }
        })

        if (!workspace) {
          throw new Error("workspace not found")
        }

        const session = await getServerSession(authOptions)
  
        if (!session || !session.user) {
          throw new Error("Kirjaudu sisään")
        }

        await prisma.table.create({
            data: {
                title,
                description,
                user: {
                    connect: {
                        id: session.user.id
                    }
                },
                workspace: {
                  connect: {
                    id: workspaceId
                  }
                }
            }
            
        })

        revalidatePath('/workspaces')
        return {successMessage: 'Tallennettu'}
    } catch(error) {
        return {
          errorMessage: error instanceof Error ? error.message : "An error occurred",          };
    }
}

export async function addNewCategoryToTable(
  tableId: string,
  prevState: AddCategoryState,
  formData: FormData
) {

  const validatedFields = FormSchemaAddCategory.safeParse({
    category: formData.get('category'),
  });
  
  if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        errorMessage: 'Täytä tarvittavat tiedot',
      };
    }

    const { category
    } = validatedFields.data

try {

    if (!tableId) {
      throw new Error("WorkspaceId missing")
    }

    const table = await prisma.table.findUnique({
      where: {
        id: tableId
      }
    })

    if (!table) {
      throw new Error("workspace not found")
    }

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      throw new Error("Kirjaudu sisään")
    }

    if (table.categories.includes(category)) {
      throw new Error("Samanniminen kategoria on jo tässä taulussa")
    }

    const newCatecogories = table.categories.concat(category)

    await prisma.table.update({
      where: {
        id: tableId
      }, data: {
        categories: newCatecogories
      }
    })

    revalidatePath('/workspaces')
    return {successMessage: 'Tallennettu'}
} catch(error) {
    return {
      errorMessage: error instanceof Error ? error.message : "An error occurred",          };
}
}

export async function addNewTask(
  tableId: string,
  category: string,
  prevState: AddTaskState,
  formData: FormData
) {
 
    const validatedFields = FormSchemaAddTask.safeParse({
        description: formData.get('description'),
        title: formData.get('title'),
      });
      
      if (!validatedFields.success) {
          return {
            errors: validatedFields.error.flatten().fieldErrors,
            errorMessage: 'Täytä tarvittavat tiedot',
          };
        }
    
        const { description, title,
        } = validatedFields.data
  
    try {

        if (!tableId) {
          throw new Error("WorkspaceId missing")
        }

        const table = await prisma.table.findUnique({
          where: {
            id: tableId
          }
        })
    
        if (!table) {
          throw new Error("workspace not found")
        }
        const session = await getServerSession(authOptions)
  
        if (!session || !session.user) {
          throw new Error("Kirjaudu sisään")
        }

        await prisma.task.create({data: {
          title,
          description,
          category,
          user: {
            connect: {
              id: session.user.id
            }
          },
          table: {
            connect: {
              id: tableId
            }
          }
        }})

        revalidatePath('/workspaces')
        return {successMessage: 'Tallennettu'}
    } catch(error) {
        return {
          errorMessage: error instanceof Error ? error.message : "An error occurred",          };
    }
}