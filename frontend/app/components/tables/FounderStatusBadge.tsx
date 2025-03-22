import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
    "email sent": "bg-[#3b489e] text-white",
    "form completed": "bg-[#9bb4dd] text-black",
    interviewed: "bg-zinc-500 text-white",
    completed: "bg-zinc-800 text-white",
};

const FounderStatusBadge = ({ status }: { status: string }) => {
    return (
        <Badge className={statusColors[status] || "bg-gray-500 text-white"}>
            {status}
        </Badge>
    );
};

export default FounderStatusBadge;
