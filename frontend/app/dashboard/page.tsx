'use client';

import { useStytchMemberSession, useStytchOrganization } from "@/app/components/Provider"
import FounderForm from "../components/FounderForm";
import { useStytchMember } from "@stytch/nextjs/b2b";

const Dashboard: React.FC = () => {
    const { session } = useStytchMemberSession();
    const { organization } = useStytchOrganization();
    const { member } = useStytchMember();

    const role = session?.roles.includes("stytch_admin") ? "admin" : "member";

    return (
        <div className="p-6 flex flex-col gap-y-6">
            <h1 className="text-3xl font-semibold">Hello {member?.name}</h1>
            <p className="text-lg text-gray-600">Welcome to your Founder Due Diligence dashboard</p>
            <p className="text-md text-gray-600">Input founder details below</p>
            <FounderForm />
            {/*  <p>Your ID is {user?.user_id}</p> */}

        </div>
    );
};

export default Dashboard;