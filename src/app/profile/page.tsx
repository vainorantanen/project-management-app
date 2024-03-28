import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

export default async function Page() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return null
    }

    return (
        <div>
            <h1>Welcome, {session.user.name}</h1>
            <h1>Invitations</h1>
        </div>
    )
}