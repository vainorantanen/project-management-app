"use server"

import { revalidatePath } from "next/cache";
import { AddCategoryState, AddTableState, AddTaskState, AddWorkspaceState } from "./formStates";
import { FormSchemaAddCategory, FormSchemaAddTable, FormSchemaAddTask, FormSchemaAddWorkspace, FormSchemaModifyTask } from "./formSchemas";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { WorkspaceInvitationStatus } from "./types";

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
    } catch(error) {
        return {
          errorMessage: error instanceof Error ? error.message : "An error occurred",          };
    }

    revalidatePath('/workspaces')
    return {successMessage: 'Tallennettu'}
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
  formData: FormData,
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

    } catch(error) {
        return {
          errorMessage: (<Error>error).message
      }
    }

    revalidatePath('/workspaces')
    return {successMessage: 'Tallennettu'}
}

export async function deleteTaskById(taskId:string) {
  try {
    const session = await getServerSession(authOptions)
  
    if (!session || !session.user) {
      throw new Error("Kirjaudu sisään")
    }

    await prisma.task.delete({where: {
      id: taskId
    }})

    revalidatePath('/workspaces')
  } catch (error) {
    throw new Error((error as Error).message);
  }
  
}

export async function modifyTask(
  taskId: string,
  prevState: AddTaskState,
  formData: FormData,
) {
 
    const validatedFields = FormSchemaModifyTask.safeParse({
        description: formData.get('description'),
        title: formData.get('title'),
        category: formData.get('category')
      });
      
      if (!validatedFields.success) {
          return {
            errors: validatedFields.error.flatten().fieldErrors,
            errorMessage: 'Täytä tarvittavat tiedot',
          };
        }
    
        const { description, title, category
        } = validatedFields.data
  
    try {
    
        const task = await prisma.task.findUnique({where: {
          id: taskId
        }})

        if (!task) {
          throw new Error("Tehtävää ei löytynyt")
        }

        const table = await prisma.table.findUnique({where: {id: task.tableId}})

        if (!table) {
          throw new Error("Taulua ei löytynyt")
        }

        const currentCategories = table.categories

        if (!currentCategories.includes(category)) {
          throw new Error("Virheellinen kategoria")
        }

        const session = await getServerSession(authOptions)
  
        if (!session || !session.user) {
          throw new Error("Kirjaudu sisään")
        }

        await prisma.task.update({where: {id: taskId}, data: {
          title,
          description,
          category,
        }})

    } catch(error) {
        return {
          errorMessage: (<Error>error).message
      }
    }

    revalidatePath('/workspaces')
    return {successMessage: 'Tallennettu'}
}

export async function sendWorkspaceInvitation(workspaceId: string, email: string) {
  try {

    const receiverUser = await prisma.user.findUnique({where: {email}})

    if (!receiverUser) {
      throw new Error("No receiver user found")
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
              id: receiverUser.id
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

  revalidatePath('/')
  return {success: "Invitation sent"}

  } catch (error) {
    console.log(error)
    return {error: (error as Error).message}
  }
}

export async function modifyWorkspaceInvitationState(invitationId: string,
  status: WorkspaceInvitationStatus) {
  
    try {
      const session = await getServerSession(authOptions)
  
      if (!session || !session.user) {
          throw new Error("Log in")
      }

      const invitation = await prisma.workspaceInvitation.findUnique({
        where: {
          id: invitationId,
          receiverUserId: session.user.id
        }
      })

      if (!invitation) {
        throw new Error("No invitation found")
      }

      await prisma.workspaceInvitation.update({
        where: {
          id: invitation.id
        },
        data: {
          status: status
        }
      })

      // modify additional data

      revalidatePath('/profile')

    } catch (error) {
      console.log(error)
    }
}