"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { getCookie } from "cookies-next";
import Loading from "../loadingComp";
import { useRouter } from "next/navigation";
import Nav from "../Nav";
export default function Add() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const title = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    axios
      .post(
        "/api/blogs",
        {
          title: title.current?.value,
          text: text.current?.value,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        router.push("/home");
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            handleSubmit();
          }}
          className="h-screen flex items-center justify-center flex-col"
        >
          {error && <h1 className="text-red-500">{error}</h1>}
          <Input placeholder="Title" ref={title} className="w-fit px-[5vw]" />
          <Textarea
            placeholder="Text"
            ref={text}
            className="w-fit px-[9vw]"
            minLength={100}
          />
          <Button>Add</Button>
        </form>
      )}
    </>
  );
}
