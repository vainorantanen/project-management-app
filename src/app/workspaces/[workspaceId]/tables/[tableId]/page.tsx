import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getTableById, getTasksByTableId } from "@/app/lib/data"
import AddNewCategoryModal from "@/app/ui/modals/AddNewCategoryModal"
import AddNewTaskModal from "@/app/ui/modals/AddNewTaskModal"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

export default async function Page({params}:any) {

    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      return (
        <p>Log in</p>
      )
    }

    const table = await getTableById(params.tableId)

    if (!table) {
        notFound()
    }

    const tasks = await getTasksByTableId(params.tableId)

    return (
        <div>
            <h1>
                {table.title}
            </h1>
            <AddNewCategoryModal tableId={table.id} />
            {table.categories && table.categories.length > 0 ? (
                table.categories.map((category, index) => (
                    <Card key={index}>
                        <CardTitle>
                            {category}
                        </CardTitle>
                        <CardContent>
                            {tasks && tasks.filter(t => t.category === category).map(task => (
                                <Card key={task.id}>
                                    <CardTitle>{task.title}</CardTitle>
                                    <CardDescription>{task.description}</CardDescription>
                                </Card>
                            ))}
                        </CardContent>
                        <AddNewTaskModal category={category} tableId={table.id} />
                    </Card>
                ))
            ) : (
                <p>Ei vielä kategorioita</p>
            )}
        </div>
    )
}