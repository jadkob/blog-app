"use client";
import { Blog } from "@prisma/client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as jwt from "jsonwebtoken";
import { Button } from "@/components/ui/button";
export default function BlogFunc() {
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, seetUsername] = useState("");
  const [error, setError] = useState<string>("");
  const { id } = useParams();
  const fetch = () => {
    setLoading(true);
    axios
      .post(
        "/api/course",
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setBlog(res.data);
      })
      .catch((err) => setError(err.response.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetch();
    const decoded: any = jwt.decode(getCookie("token") as string);
    seetUsername(decoded.username);
  }, []);
  return (
    <>
      {error && <h1>{error}</h1>}
      <div className="text-center mt-[20vh]">
        <h1 className="mb-[5vh] text-[2rem]">Username: {blog?.username}</h1>
        <div className="flex gap-[5vh] justify-center items-center mb-[10vw]">
          <h1 className="text-[1.5rem]">Likes: {blog?.likes}</h1>
          {blog?.likedUsers.includes(username) ? (
            <Button
              className="w-fit px-[5vw] text-[2rem]"
              onClick={() => {
                let likedUsers: string[];
                if (typeof blog.likedUsers === "string")
                  likedUsers = JSON.parse(blog.likedUsers);
                else likedUsers = blog.likedUsers;
                const newLikedUsers = likedUsers.filter(
                  (p) => p !== blog.username
                );
                setBlog((prevBlog: any) => ({
                  ...prevBlog, // Spread the previous state
                  likes: blog.likes - 1, // Update the likes property
                  likedUsers: newLikedUsers, // Update the likedUsers property
                }));

                axios
                  .post(
                    "/api/blogs/dislike",
                    { id },
                    {
                      headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                      },
                    }
                  )
                  .then((res) => {})
                  .catch((err) => {
                    alert("There was an error liking this blog");
                  });
              }}
            >
              Dislike
            </Button>
          ) : (
            <Button
              className="w-fit px-[5vw] text-[1.5rem]"
              onClick={() => {
                if (!blog) return;
                let likedUsers: string[];
                if (typeof blog.likedUsers === "string")
                  likedUsers = JSON.parse(blog.likedUsers);
                else likedUsers = blog.likedUsers;

                setBlog((prevBlog: any) => ({
                  ...prevBlog, // Spread the previous state
                  likes: blog.likes + 1, // Update the likes property
                  likedUsers: [...likedUsers, username], // Update the likedUsers property
                }));
                axios.post(
                  "/api/blogs/like",
                  { id },
                  {
                    headers: {
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  }
                );
              }}
            >
              Like
            </Button>
          )}
        </div>
        <h1 className="text-[2rem] text-center mb-[10vh] font-bold">
          {blog?.title}
        </h1>
        <p>{blog?.text}</p>
      </div>
    </>
  );
}
