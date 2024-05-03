import { prisma } from "../prisma"
import * as jwt from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        const { id } = await req.json()
        const authHeader = req.headers.get("Authorization")
        const token = authHeader && authHeader.split(' ')[1]

        if (!token || !await jwt.verify(token as string, "secret")) 
            return new Response("Unauthorized", {status: 401})
        
        const blog = await prisma.blog.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!blog) return new Response("Post not found", {status: 404})
        
        return Response.json(blog)
    } catch (error: any) {
        return new Response(error.message, {status: 500})
    }
}