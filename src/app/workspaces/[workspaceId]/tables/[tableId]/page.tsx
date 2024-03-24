import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getTableById } from "@/app/lib/data"
import AddNewCategoryModal from "@/app/ui/modals/AddNewCategoryModal"
import { Card, CardTitle } from "@/components/ui/card"
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
                    </Card>
                ))
            ) : (
                <p>Ei vielä kategorioita</p>
            )}
        </div>
    )
}