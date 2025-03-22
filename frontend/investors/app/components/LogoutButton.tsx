import { Button } from "@/components/ui/button";
import { useStytch } from "@stytch/nextjs";
import { LogOut } from "lucide-react";

function LogoutButton() {
    const stytch = useStytch();
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