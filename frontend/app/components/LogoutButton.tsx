"use client"

import { Button } from "@/components/ui/button";
import { useStytchB2BClient } from "@stytch/nextjs/b2b";
import { LogOut } from "lucide-react";

function LogoutButton() {
    const stytch = useStytchB2BClient();
    return (
        <Button className="w-fit cursor-pointer"
            onClick={
                () => stytch.session.revoke()
            }
        >
            Log Out <LogOut />
        </Button>
    );
}

export default LogoutButton;