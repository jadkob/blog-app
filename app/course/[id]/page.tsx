"use client";
import { Blog } from "@prisma/client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogFunc() {
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState<boolean>(false);
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
  }, []);
  return (
    <>
      {error && <h1>{error}</h1>}
      <div className="text-center mt-[20vh]">
        <h1 className="text-[2rem] text-center mb-[10vh] font-bold">
          {blog?.title}
        </h1>
        <p>{blog?.text}</p>
        <p>Madee by: {blog?.username}</p>
      </div>
    </>
  );
}
