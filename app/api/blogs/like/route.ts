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

    let likedUsers: string[] = JSON.parse(post.likedUsers);

    if (likedUsers.includes(decoded.username))
      return new Response("Post already liked", { status: 400 });

    likedUsers.push(decoded.username as string);
    const newPost = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        likes: post.likes + 1,
        likedUsers: JSON.stringify(likedUsers),
      },
    });
    return Response.json(newPost);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
