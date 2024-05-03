"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "../loadingComp";
import { setCookie } from "cookies-next";
export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          className="flex flex-col h-screen w-full items-center justify-center gap-[5vh]"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            axios
              .post("/api/signup", {
                username: username.current?.value,
                password: username.current?.value,
              })
              .then((res) => {
                console.log(res.data);
                setCookie("token", res.data);
                router.push("/home");
              })
              .catch((err) => setError(err.response.data))
              .finally(() => setLoading(false));
          }}
        >
          {error && <h1 className="text-red-500">{error}</h1>}
          <Input
            type="text"
            placeholder="Username"
            ref={username}
            className="px-[5vw] w-fit"
          />
          <Input
            type="password"
            placeholder="Password"
            ref={password}
            className="px-[5vw] w-fit"
          />
          <Button>SignUp</Button>
        </form>
      )}
    </>
  );
}
