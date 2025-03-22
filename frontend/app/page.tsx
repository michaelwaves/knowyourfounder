"use client"

import { useStytch, useStytchUser } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Login from "./components/Login";

const MAGIC_LINKS_TOKEN = "magic_links"

export default function Home() {
  const { user, isInitialized } = useStytchUser();
  const stytch = useStytch();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      const token = searchParams.get("token");
      const stytch_token_type = searchParams.get("stytch_token_type");

      if (token && stytch_token_type === MAGIC_LINKS_TOKEN) {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
  }, [isInitialized, router, searchParams, stytch, user]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    if (user) {
      router.replace("/dashboard");
    }
  }, [router, user, isInitialized]);

  return (
    <div>
      <Login />
    </div>
  );
}
