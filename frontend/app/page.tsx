"use client"

import { Suspense, useEffect } from "react";
import LoginSuspense from "./LoginSuspense";
export default function Home() {

  return (
    <div>
      <Suspense>
        <LoginSuspense />
      </Suspense>
    </div>
  );
}
