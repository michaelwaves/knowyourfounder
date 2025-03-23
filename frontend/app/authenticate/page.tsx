"use client"
import Authenticate from "@/app/components/Authenticate";
import { Suspense } from "react";

export default function AuthenticatePage() {

    return (
        <Suspense>
            <Authenticate />;
        </Suspense>
    )
}