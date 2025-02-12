"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/Header"; 
import CreateButton from "../components/CreateButton"; 

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center w-full">
        <CreateButton />
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
        {session?.user && (
          <p className="text-lg mt-2">
            Logged in as <span className="font-semibold">{session.user.email}</span>
          </p>
        )}
      </main>
    </>
  );
}
