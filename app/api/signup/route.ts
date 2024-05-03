import { prisma } from "../prisma";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { checkEmpty } from "../checkEmpty";
export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()
        const hashedPass = await bcrypt.hash(password, 10)
        if (!username || !password || checkEmpty([username, password])) return new Response("Please enter all fields", {status: 400})
        const userCheck = await prisma.user.findFirst({
            where: {
                username
            }
        })
        if (userCheck) return new Response("Username already exists", {status: 400})
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPass
            }
        });
        if (!user) return new Response("Error creating user", {status: 500})
            const token = await jwt.sign({id: user.id, username: username}, "secret")
        return Response.json(token)
    } catch (error: any) {
        return new Response(error.message, { status: 500})
    }
}