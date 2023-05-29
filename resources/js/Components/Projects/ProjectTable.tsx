import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/Components/Table";
import route from "ziggy-js";
import { Link } from "@inertiajs/react";

type Project = {
    name_generated: string;
    reference: string;
    customer?: {
        name: string;
    };
    start_date: string;
};

const columnHelper = createColumnHelper<Project>();

const columns = [
    columnHelper.accessor("name_generated", {
        header: "Name",
        cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("reference", {
        header: "Reference",
        cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("customer.name", {
        header: "Customer",
        cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("start_date", {
        header: "Start date",
        cell: (info: any) => info.getValue(),
    }),
    columnHelper.display({
        header: "Actions",
        cell: ({ row }: any) => {
            return (
                <Link href={route("projects.edit", row.original)}>Edit</Link>
            );
        },
    }),
];

export default function ProjectsTable() {
    return <Table columns={columns} url={route("projects.query")} />;
}
