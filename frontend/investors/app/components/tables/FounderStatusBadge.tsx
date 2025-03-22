import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
    "email sent": "bg-blue-500 text-white",
    "form completed": "bg-yellow-500 text-white",
    interviewed: "bg-purple-500 text-white",
    completed: "bg-green-500 text-white",
};

const FounderStatusBadge = ({ status }: { status: string }) => {
    return (
        <Badge className={statusColors[status] || "bg-gray-500 text-white"}>
            {status}
        </Badge>
    );
};

export default FounderStatusBadge;
