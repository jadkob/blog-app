"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function App() {
  return <div className="h-screen flex items-center justify-center gap-[10vw]">
    <Button asChild className="text-[1.5rem] px-[8vw]">
      <Link href="/login">Login</Link>
    </Button>
    <Button asChild className="text-[1.5rem] px-[8vw]">
      <Link href="/signup">SignUp</Link>
    </Button>
  </div> 
} 
