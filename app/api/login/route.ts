import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { prisma } from "../prisma"
import { checkEmpty } from "../checkEmpty"

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()
        if (!username || !password || checkEmpty([username, password])) return new Response("Please enter all fields", {status: 400})
        const userCheck = await prisma.user.findFirst({
            where: {
                username
            }
        })
        if (!userCheck) return new Response("Username not found", {status: 400})
            if (!await bcrypt.compare(password, userCheck.password)) return new Response("Wrong password", {status: 400})
                const token = await jwt.sign({ id: userCheck.id, username: username}, "secret")
            return Response.json(token)
    } catch (error: any) {
        return new Response(error.message, {status: 500})
    }
}