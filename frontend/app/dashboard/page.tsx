"use client"

import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FounderForm from "../components/forms/FounderForm";

function DashboardPage() {
    const { user, isInitialized } = useStytchUser();
    const router = useRouter();

    // If the Stytch SDK no longer has a User then redirect to login; for example after logging out.
    useEffect(() => {
        if (isInitialized && !user) {
            router.replace("/");
        }
    }, [user, isInitialized, router]);
    return (
        <div className="p-6 flex flex-col gap-y-6">
            <h1 className="text-3xl font-semibold">Hello {user?.name.first_name}</h1>
            <p className="text-lg text-gray-600">Welcome to your Founder Due Diligence dashboard</p>
            <p className="text-md text-gray-600">Input founder details below</p>
            <FounderForm />
            {/*  <p>Your ID is {user?.user_id}</p> */}

        </div>
    );
}

export default DashboardPage;