"use client"
import { Founders } from "@/lib/postgres/schema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTable } from "./DataTable";
import FounderStatusBadge from "./FounderStatusBadge";

const foundersColumns: ColumnDef<Founders>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "first_name",
        header: "First Name",
        cell: ({ row }) => <Link
            className="text-primary underline"
            href={`/dashboard/founders/${row.original.id}`}>{row.original.first_name}</Link>
    },
    {
        accessorKey: "last_name",
        header: "Last Name",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <FounderStatusBadge status={row.original.status ?? ""} />
    },
]

function Founderstable({ data }: { data: Founders[] }) {
    return (
        <DataTable data={data} columns={foundersColumns} />
    );
}

export default Founderstable;