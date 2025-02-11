"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  const [clientStatus, setClientStatus] = useState(status);
  console.log("clientStatus", clientStatus);

  // Update the session status when it changes
  useEffect(() => {
    setClientStatus(status);
  }, [status]);

  const showSession = () => {
    if (clientStatus === "authenticated") {
      return (
        <button
          className="border border-solid border-black rounded"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/login");
            });
          }}
        >
          Sign Out
        </button>
      );
    } else if (clientStatus === "loading") {
      return <span className="text-[#888] text-sm mt-7">Loading...</span>;
    } else {
      return (
        <Link
          href="/login"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl">Home</h1>
      {showSession()}
    </main>
  );
}
