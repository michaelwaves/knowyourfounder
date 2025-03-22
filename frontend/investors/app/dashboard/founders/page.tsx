"use client"
import Founderstable from "@/app/components/tables/FoundersTable";
import { selectAll } from "@/lib/postgres/tables/batch";
import { useStytchUser } from "@stytch/nextjs";
import { Loader } from "lucide-react";
import useSWR from "swr";

function CasesPage() {
    const { user } = useStytchUser()
    const { data, error, isLoading } = useSWR(
        user?.user_id ? ["cases", user?.user_id] : null,
        () => selectAll('founders', user?.user_id ?? ""),
    )
    console.log(user?.user_id)
    return (
        <div className="flex gap-y-6 p-6 flex-col">
            <h1 className="text-3xl font-semibold">Founders</h1>
            <div>
                {isLoading ? <Loader className="animate-spin" /> :
                    data && <Founderstable data={data} />}
            </div>
        </div>
    );
}

export default CasesPage;