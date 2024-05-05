import * as jwt from "jsonwebtoken";
import { prisma } from "../../prisma";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const authHeader = req.headers.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    const decoded: any = jwt.decode(token as string);

    if (!token || !jwt.verify(token, "secret"))
      return new Response("Unauthorized", { status: 401 });

    const post = await prisma.blog.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!post) return new Response("Post not found", { status: 404 });

    const likedUsers: string[] = JSON.parse(post.likedUsers);
    const newLiked = likedUsers.filter((p: any) => p !== decoded.username);
    const newBlog = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        likedUsers: JSON.stringify(newLiked),
        likes: post.likes - 1,
      },
    });
    return Response.json(newBlog);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
