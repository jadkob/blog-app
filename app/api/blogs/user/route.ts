import * as jwt from "jsonwebtoken";
import { prisma } from "../../prisma";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unaothorized", { status: 403 });

    const decoded: any = await jwt.decode(token);
    const username = decoded.username;
    const blogs = await prisma.blog.findMany({
      where: {
        username,
      },
    });
    if (blogs.length == 0)
      return new Response("You havent posted anytinh yet", { status: 404 });
    return Response.json(blogs);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
