import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Nav() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = getCookie("token");
    const decoded: any = jwt.decode(token as string);
    setUsername(decoded.username);
  }, []);
  return (
    <nav className="flex justify-center mb-[10vh] gap-[10vw]">
      <Link href={"/home"}>Home</Link>
      <Link href={"/add"}>Add</Link>
      <Link href={"/profile"}>Profile</Link>
      <button
        onClick={() => {
          deleteCookie("token");
          router.push("/");
        }}
      >
        LogOut
      </button>
    </nav>
  );
}
