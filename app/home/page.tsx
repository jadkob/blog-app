"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Blog } from "@prisma/client";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Nav from "../Nav";
import Loading from "../loadingComp";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/blogs", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Nav />
      {error && <h1>{error}</h1>}
      {loading && <Loading />}
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} className="text-left pl-[5vw]">
            <h1 className="text-[2rem]">Author: {blog.username}</h1>
            <h1 className="text-[2rem] font-bold">{blog.title}</h1>
            <p className="truncate text-pretty line-clamp-3">{blog.text}</p>
            <Button asChild>
              <Link href={`/course/${blog.id}`}>View Blog</Link>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
