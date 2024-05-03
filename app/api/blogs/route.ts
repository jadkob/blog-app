import * as jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import { checkEmpty } from "../checkEmpty";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    const decoded: any = jwt.decode(token as string);
    const username = decoded.username;

    if (!token || !(await jwt.verify(token, "secret"))) {
      return new Response("Unauthorized", { status: 401 });
    }

    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          username,
        },
      },
    });
    if (blogs.length > 0) {
      return Response.json(blogs);
    } else {
      return new Response("No Blogs Yet", { status: 404 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { title, text } = await req.json();
    const authHeaders = req.headers.get("Authorization");
    const token = authHeaders && authHeaders.split(" ")[1];
    const decoded: any = await jwt.decode(token as string);
    const username = decoded.username;

    if (!title || !text || checkEmpty([title, text]))
      return new Response("Please enter all required fields", { status: 400 });
    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unauthorized", { status: 401 });

    const blog = await prisma.blog.create({
      data: {
        text,
        title,
        username,
      },
    });
    if (blog) return Response.json(blog);
    else
      return new Response("There was an error creating Blog", { status: 500 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const authHeader = req.headers.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    const decoded: any = await jwt.decode(token as string);
    const blogCheck = await prisma.blog.findUnique({
      where: {
        id,
      },
    });
    if (!blogCheck) return new Response("Blog not found", { status: 404 });
    const blog = await prisma.blog.delete({
      where: {
        id,
      },
    });
    return Response.json(blog);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
